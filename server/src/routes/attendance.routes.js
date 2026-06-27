const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const supabaseAdmin = require('../lib/supabaseAdmin');

router.post('/check-in', asyncHandler(async (req, res) => {
    const { phone_number } = req.body;

    if (!phone_number) {
        return res.status(400).json({ error: 'phone_number is required' });
    }

    const { data: member, error: memberError } = await supabaseAdmin
        .from('profiles')
        .select('id, full_name')
        .eq('phone_number', phone_number)
        .single();

    if (memberError || !member) {
        return res.status(404).json({ status: 'NOT_FOUND', error: 'Member not found' });
    }

    const today = new Date().toISOString().split('T')[0];
    const { data: sub } = await supabaseAdmin
        .from('subscriptions')
        .select('end_date')
        .eq('member_id', member.id)
        .eq('is_active', true)
        .gte('end_date', today)
        .order('end_date', { ascending: false })
        .limit(1)
        .single();

    if (!sub) {
        return res.status(403).json({ status: 'EXPIRED', member });
    }

    const { error: attendanceError } = await supabaseAdmin
        .from('attendance')
        .insert({ member_id: member.id });

    if (attendanceError) throw attendanceError;

    res.json({ status: 'CHECKED_IN', member, expiresOn: sub.end_date });
}));

module.exports = router;