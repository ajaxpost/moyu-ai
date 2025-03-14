import winston from "winston";
import "winston-daily-rotate-file";

const { format, transports } = winston;

export const logger = winston.createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    // format.simple(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      level: "debug",
      dirname: "logs",
      filename: "server-%DATE%.log",
      datePattern: "YYYY-MM-DD_HH",
      zippedArchive: true,
      maxSize: 1024,
    }),
  ],
});
