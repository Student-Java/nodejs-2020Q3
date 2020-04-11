const { LOGS_DIR } = require('./config');
const winston = require('winston');
const morgan = require('morgan');
const { combine, timestamp, prettyPrint } = winston.format;

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));

const options = {
  fileUnhandled: {
    format: combine(timestamp(), prettyPrint()),
    level: 'info',
    filename: `${LOGS_DIR}/exceptions.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  fileError: {
    format: combine(timestamp(), prettyPrint()),
    level: 'error',
    filename: `${LOGS_DIR}/errors.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  fileInfo: {
    format: combine(timestamp(), prettyPrint()),
    level: 'info',
    filename: `${LOGS_DIR}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
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
  exitOnError: false // do not exit on handled exceptions
});

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true,
      colorize: true
    })
  );
}

logger.stream = {
  write: message => logger.info(message)
};

module.exports = logger;
