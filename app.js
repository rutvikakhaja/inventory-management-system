const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const productRoutes = require('./routes/product.route');
const salesRoutes = require('./routes/sales.route');
const indexRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/v1/product', productRoutes);
app.use('/v1/sale', salesRoutes);

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
    status: err.status || 500,
    success: false
  }
  );
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found',
    status: 404,
    success: false
  });
});

module.exports = app;
