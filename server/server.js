require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Amizone Fitness server running on http://localhost:${PORT}`);
    });
}

module.exports = app;