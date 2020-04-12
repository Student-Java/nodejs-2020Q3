const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./common/logging');

process.on('unhandledRejection', reason => {
  process.emit('uncaughtException', reason);
});

app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);
