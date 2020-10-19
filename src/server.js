// Any uncaught exception or rejection is caught and processed by Winston
const logger = require('./common/logging');
const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);
