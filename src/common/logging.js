const { LOGS_DIR } = require('./config');
const winston = require('winston');
const morgan = require('morgan');
const { combine, timestamp, prettyPrint } = winston.format;

morgan.token('body', req =>
  JSON.stringify(req.body).replace(/,("password":").+"/, '$1***"')
);
morgan.token('query', req => JSON.stringify(req.query));

const format = combine(timestamp(), prettyPrint());
const options = {
  fileInfo: {
    format,
    level: 'info',
    filename: `${LOGS_DIR}/app.log`,
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
  },
  fileUnhandled: {
    format,
    level: 'error',
    filename: `${LOGS_DIR}/exceptions.log`,
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
  },
  fileError: {
    format,
    level: 'error',
    filename: `${LOGS_DIR}/errors.log`,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.fileError),
    new winston.transports.File(options.fileInfo)
  ],
  exceptionHandlers: [new winston.transports.File(options.fileUnhandled)],
  exitOnError: true
});

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true,
      handleRejections: true,
      colorize: false
    })
  );
}

logger.stream = {
  write: message => logger.info(message)
};

module.exports = logger;
