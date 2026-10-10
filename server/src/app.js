const path = require('path');
const express = require('express');
const cors = require('cors');
const config = require('./config');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = config.clientOrigin.split(',').map((o) => o.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '10kb' }));

app.use('/thumbnails', express.static(path.join(__dirname, '..', 'public', 'thumbnails'), { maxAge: '7d' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/templates', require('./routes/templates'));
app.use('/api/favorites', require('./routes/favorites'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
