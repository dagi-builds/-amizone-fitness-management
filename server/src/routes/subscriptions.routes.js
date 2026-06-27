const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const supabaseAdmin = require('../lib/supabaseAdmin');

router.post('/', asyncHandler(async (req, res) => {
    const { member_id, plan_id } = req.body;

    if (!member_id || !plan_id) {
        return res.status(400).json({ error: 'member_id and plan_id are required' });
    }

    const { data: plan, error: planError } = await supabaseAdmin
        .from('membership_plans')
        .select('duration_days')
        .eq('id', plan_id)
        .single();

    if (planError) throw planError;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration_days);

    const { data, error } = await supabaseAdmin
        .from('subscriptions')
        .insert({
            member_id,
            plan_id,
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
            is_active: true,
        })
        .select()
        .single();

    if (error) throw error;
    res.status(201).json(data);
}));

router.get('/', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('subscriptions')
        .select('*, profiles(full_name, phone_number), membership_plans(name, price_etb)')
        .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
}));

module.exports = router;