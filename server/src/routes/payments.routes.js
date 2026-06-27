const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const supabaseAdmin = require('../lib/supabaseAdmin');

router.post('/', asyncHandler(async (req, res) => {
    const { member_id, subscription_id, amount_etb, method, reference_id } = req.body;

    if (!member_id || !amount_etb || !method) {
        return res.status(400).json({ error: 'member_id, amount_etb, and method are required' });
    }

    const { data, error } = await supabaseAdmin
        .from('payments')
        .insert({ member_id, subscription_id, amount_etb, method, reference_id })
        .select()
        .single();

    if (error) throw error;
    res.status(201).json(data);
}));

router.get('/', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('payments')
        .select('*, profiles(full_name, phone_number)')
        .order('paid_at', { ascending: false });

    if (error) throw error;
    res.json(data);
}));

module.exports = router;