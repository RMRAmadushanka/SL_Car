const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const logger = require('./utils/logger');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => logger.info('MongoDB connected'))
.catch(err => logger.error(err.message));

app.use('/api/users', userRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404);
  next(new Error('Not Found'));
});

// Error middleware should be added after the routes
app.use(errorHandler);

module.exports = app;
