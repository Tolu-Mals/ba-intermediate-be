import winston from 'winston';
import Env from '../config/env';
import path from 'node:path';
import 'winston-daily-rotate-file';

const { combine, json, errors, timestamp, splat, colorize, simple } =
  winston.format;

const logFormat = combine(
  json(), //logs as json is good standard practive
  errors({ stack: true }), //adds supports for errors including stack trace
  splat(), //alows you to do interpolation in log messages
  timestamp({
    //adds timestamps to logs
    format: 'YYYY-MM-DD hh:mm:ss.SSS A', // sets format 2022-01-25 03:23:10.350 PM
  }),
);

/*
Log Rotation

Log rotation is a process that limits the size of log files by creating new files periodically and archiving old ones. This is crucial for production applications because:

- Prevents Disk Space Issues: Without rotation, logs would grow indefinitely and eventually fill up your disk
- Improves Performance: Smaller log files are faster to write to and read from
- Simplifies Log Management: Makes it easier to archive, compress, or delete older logs
- Aids Troubleshooting: Organizes logs by time periods, making it easier to find relevant information
*/
const errorRotateFile = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, '../logs/error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '20m',
  maxFiles: '14d',
  zippedArchive: true, // Compress rotated logs
  auditFile: 'audit-log.json', // Keep track of all log files
  createSymlink: true, // Create a symbolic link to the current log file
  symlinkName: 'current.log', // Name of the symbolic link
  frequency: '24h', // Custom rotation frequency
});

const combinedRotateFile = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, '../logs/combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  zippedArchive: true, // Compress rotated logs
  auditFile: 'audit-log.json', // Keep track of all log files
  createSymlink: true, // Create a symbolic link to the current log file
  symlinkName: 'current.log', // Name of the symbolic link
  frequency: '24h', // Custom rotation frequency
});

const logger = winston.createLogger({
  level: Env.LOG_LEVEL,
  format: logFormat,
  transports: [errorRotateFile, combinedRotateFile],
});

if (Env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), simple()),
    }),
  );
}

export default logger;
