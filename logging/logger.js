// Desc: logger for the application
const winston = require("winston");
const { DailyRotateFile } = require("winston-daily-rotate-file");

// Define severity levels.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};
// Define different colors for each level.
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};
winston.addColors(colors);

const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  // Tell Winston that the logs must be colored
  // winston.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
    ),
  }),
  // Allow to print all the error level messages inside the error.log file
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    colorize: false,
  }),
  // Allow to print all the error message inside the all.log file
  new winston.transports.DailyRotateFile({
    filename: "logs/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    colorize: false,
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

module.exports = logger;
