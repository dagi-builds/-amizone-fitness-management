const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const supabaseAdmin = require('../lib/supabaseAdmin');

router.post('/', asyncHandler(async (req, res) => {
    const { name, price_etb, duration_days } = req.body;
    if (!name || !price_etb || !duration_days) {
        return res.status(400).json({ error: 'name, price_etb, and duration_days are required' });
    }
    const { data, error } = await supabaseAdmin
        .from('membership_plans')
        .insert({ name, price_etb, duration_days })
        .select()
        .single();
    if (error) throw error;
    res.status(201).json(data);
}));

router.get('/', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('membership_plans')
        .select('*')
        .order('price_etb', { ascending: true });
    if (error) throw error;
    res.json(data);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { name, price_etb, duration_days } = req.body;
    const { data, error } = await supabaseAdmin
        .from('membership_plans')
        .update({ name, price_etb, duration_days })
        .eq('id', req.params.id)
        .select()
        .single();
    if (error) throw error;
    res.json(data);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { error } = await supabaseAdmin
        .from('membership_plans')
        .delete()
        .eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Plan deleted' });
}));

module.exports = router;