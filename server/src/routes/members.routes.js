const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const supabaseAdmin = require('../lib/supabaseAdmin');

router.post('/', asyncHandler(async (req, res) => {
    const { full_name, phone_number, weight_kg, height_cm, fitness_goal, gender, date_of_birth } = req.body;

    if (!full_name || !phone_number) {
        return res.status(400).json({ error: 'full_name and phone_number are required' });
    }

    const { data, error } = await supabaseAdmin
        .from('profiles')
        .insert({ full_name, phone_number, weight_kg, height_cm, fitness_goal, gender, date_of_birth })
        .select()
        .single();

    if (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'A member with this phone number already exists' });
        }
        throw error;
    }

    res.status(201).json(data);
}));

router.get('/', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
}));

router.get('/:phone', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('phone_number', req.params.phone)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return res.status(404).json({ error: 'Member not found' });
        throw error;
    }
    res.json(data);
}));
const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const supabaseAdmin = require('../lib/supabaseAdmin');

router.post('/', asyncHandler(async (req, res) => {
    const { full_name, phone_number, weight_kg, height_cm, fitness_goal, gender, date_of_birth } = req.body;
    if (!full_name || !phone_number) {
        return res.status(400).json({ error: 'full_name and phone_number are required' });
    }
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .insert({ full_name, phone_number, weight_kg, height_cm, fitness_goal, gender, date_of_birth })
        .select()
        .single();
    if (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'A member with this phone number already exists' });
        }
        throw error;
    }
    res.status(201).json(data);
}));

router.get('/', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
}));

router.get('/:phone', asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('phone_number', req.params.phone)
        .single();
    if (error) {
        if (error.code === 'PGRST116') return res.status(404).json({ error: 'Member not found' });
        throw error;
    }
    res.json(data);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { full_name, phone_number, weight_kg, height_cm, fitness_goal, gender } = req.body;
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .update({ full_name, phone_number, weight_kg, height_cm, fitness_goal, gender })
        .eq('id', req.params.id)
        .select()
        .single();
    if (error) throw error;
    res.json(data);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { error } = await supabaseAdmin
        .from('profiles')
        .delete()
        .eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Member deleted' });
}));

module.exports = router;

