const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./Config/db');
const logger = require('./Utils/Logger');
const config = require('./Config/config');
const routes = require('./routes/Index');
require('./Config/passport');
const errorHandler = require('./Middleware/ErrorHandler');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();


app.use(session({
  secret: 'your_secret_key', // Change this to a secure, random secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // Set to true if you're using HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);


const PORT = config.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});


// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Export the app for testing or other uses
module.exports = app;