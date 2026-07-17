const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const supabaseAdmin = require('../lib/supabaseAdmin');

router.get('/pin', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('settings')
        .select('value')
        .eq('key', 'admin_pin')
        .single();
    if (error) throw error;
    res.json({ pin: data.value });
}));

router.put('/pin', asyncHandler(async (req, res) => {
    const { current_pin, new_pin } = req.body;

    if (!current_pin || !new_pin) {
        return res.status(400).json({ error: 'current_pin and new_pin are required' });
    }

    if (new_pin.length < 4) {
        return res.status(400).json({ error: 'PIN must be at least 4 characters' });
    }

    const { data: setting, error: fetchError } = await supabaseAdmin
        .from('settings')
        .select('value')
        .eq('key', 'admin_pin')
        .single();

    if (fetchError) throw fetchError;

    if (setting.value !== current_pin) {
        return res.status(401).json({ error: 'Current PIN is incorrect' });
    }

    const { data, error } = await supabaseAdmin
        .from('settings')
        .update({ value: new_pin, updated_at: new Date().toISOString() })
        .eq('key', 'admin_pin')
        .select()
        .single();

    if (error) throw error;
    res.json({ message: 'PIN updated successfully' });
}));

module.exports = router;