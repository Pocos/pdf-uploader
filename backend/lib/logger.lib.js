const winston = require('winston');
const jsonStringify = require('fast-safe-stringify');

const { combine, timestamp, printf } = winston.format;

const loggers = {};

const customFormat = winston.format((info, opts) => {
  const stringifiedRest = jsonStringify({
    ...info,
    level: undefined,
    message: undefined,
    splat: undefined,
    timestamp: undefined,
  });

  // const padding = (info.padding && info.padding[info.level]) || '';
  if (stringifiedRest !== '{}') {
    info.params = stringifiedRest;
  } else {
    info.params = '';
  }

  info.topic = opts;

  return info;
});

const getLogger = (category = 'default') => {
  if (!loggers[category]) {
    const consoleTransport = new winston.transports.Console({
      level: 'debug',
      format: combine(
        timestamp({ format: 'HH:mm:ss' }),
        customFormat(category),
        printf(info => `${info.timestamp} [${info.topic}] ${info.level}: ${info.message} ${info.params}`),
      ),
      colorize: true,
    });

    const categoryLogger = winston.createLogger({
      transports: [consoleTransport],
    });

    categoryLogger.topic = category;

    loggers[category] = categoryLogger;
  }
  return loggers[category];
};

const logger = getLogger();
logger.log('info', 'Starting..', {
  ts: new Date(),
});

module.exports.getLogger = getLogger;
