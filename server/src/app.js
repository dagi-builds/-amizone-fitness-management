const express = require('express');
const cors = require('cors');

const membersRoutes = require('./routes/members.routes');
const subscriptionsRoutes = require('./routes/subscriptions.routes');
const paymentsRoutes = require('./routes/payments.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const aiRoutes = require('./routes/ai.routes');
const plansRoutes = require('./routes/plans.routes');
const productsRoutes = require('./routes/products.routes');
const salesRoutes = require('./routes/sales.routes');
const settingsRoutes = require('./routes/settings.routes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'amizone-fitness-server', time: new Date().toISOString() });
});

app.use('/api/members', membersRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/settings', settingsRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

app.use(errorHandler);

module.exports = app;