const moment = require('moment');
const fs = require('fs');
const winston = require('winston');
require('winston-daily-rotate-file');

const logDir = __dirname + '/../logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }

  return info;
});

let infoTransport = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: '%DATE%_info.log',
  datePattern: 'YYYY-MM-DD',
  dirname: logDir + '/info',
  maxFiles: '30d',
});

let errorTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: '%DATE%_error.log',
  datePattern: 'YYYY-MM-DD',
  dirname: logDir + '/error',
  maxFiles: '30d',
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `[${level}] ${moment().format('yyyy[-]MM[-]DD HH[:]mm[:]ss')} ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    infoTransport,
    errorTransport
  ],
});

const loggingConsole = (level = process.env.NODE_ENV === 'development' ? 'debug' : 'info', message) => (
  new winston.createLogger({
    level,
    foramt: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.splat(),
      winston.format.printf(() => `[${level}] ${message}`)
    ),
    transports: [new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })],
  })
);

module.exports = { logger, loggingConsole };
