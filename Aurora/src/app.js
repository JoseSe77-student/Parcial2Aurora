const express = require('express');
const librosRouter = require('./routes/libros.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Rutas
app.use('/api/libros', librosRouter);

// Middleware
app.use(errorHandler);

module.exports = app;
