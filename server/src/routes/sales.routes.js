const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const supabaseAdmin = require('../lib/supabaseAdmin');

router.get('/', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('sales')
        .select('*, products(name, category)')
        .order('sold_at', { ascending: false });
    if (error) throw error;
    res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { product_id, quantity, payment_method } = req.body;
    if (!product_id || !quantity || !payment_method) {
        return res.status(400).json({ error: 'product_id, quantity, and payment_method are required' });
    }

    const { data: product, error: productError } = await supabaseAdmin
        .from('products')
        .select('price_etb, stock_quantity, name')
        .eq('id', product_id)
        .single();

    if (productError) throw productError;
    if (product.stock_quantity < quantity) {
        return res.status(400).json({ error: `Not enough stock. Only ${product.stock_quantity} left.` });
    }

    const total_etb = product.price_etb * quantity;

    const { data: sale, error: saleError } = await supabaseAdmin
        .from('sales')
        .insert({ product_id, quantity, unit_price_etb: product.price_etb, total_etb, payment_method })
        .select()
        .single();

    if (saleError) throw saleError;

    await supabaseAdmin
        .from('products')
        .update({ stock_quantity: product.stock_quantity - quantity })
        .eq('id', product_id);

    res.status(201).json(sale);
}));

router.get('/summary', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('sales')
        .select('total_etb, payment_method, sold_at');
    if (error) throw error;

    const total = data.reduce((sum, s) => sum + Number(s.total_etb), 0);

    const byMethod = data.reduce((acc, s) => {
        acc[s.payment_method] = (acc[s.payment_method] || 0) + Number(s.total_etb);
        return acc;
    }, {});

    const today = new Date().toISOString().split('T')[0];
    const todayTotal = data
        .filter(s => s.sold_at.startsWith(today))
        .reduce((sum, s) => sum + Number(s.total_etb), 0);

    res.json({ total, byMethod, todayTotal, transactionCount: data.length });
}));

module.exports = router;