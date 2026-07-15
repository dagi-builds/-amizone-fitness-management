const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const supabaseAdmin = require('../lib/supabaseAdmin');

router.get('/', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { name, category, price_etb, stock_quantity, description } = req.body;
    if (!name || !category || !price_etb) {
        return res.status(400).json({ error: 'name, category, and price_etb are required' });
    }
    const { data, error } = await supabaseAdmin
        .from('products')
        .insert({ name, category, price_etb, stock_quantity: stock_quantity || 0, description })
        .select()
        .single();
    if (error) throw error;
    res.status(201).json(data);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { name, category, price_etb, stock_quantity, description } = req.body;
    const { data, error } = await supabaseAdmin
        .from('products')
        .update({ name, category, price_etb, stock_quantity, description })
        .eq('id', req.params.id)
        .select()
        .single();
    if (error) throw error;
    res.json(data);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { error } = await supabaseAdmin
        .from('products')
        .delete()
        .eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Product deleted' });
}));

module.exports = router;