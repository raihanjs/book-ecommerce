const app = require('./app');
const config = require('./Config/config');
const logger = require('./Utils/Logger');

// Start the server
const PORT = config.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('Info');
  
  // logger.info(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});