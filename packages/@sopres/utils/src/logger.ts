import winston from "winston";
export type Logger = winston.Logger;

const { combine, timestamp, printf, colorize, errors } = winston.format;

interface LogFormatInfo {
  level: string;
  message: unknown;
  timestamp?: string;
  stack?: unknown;
  [key: string]: unknown;
}

// Custom log format
const logFormat = printf(
  ({ level, message, timestamp, stack, ...metadata }: LogFormatInfo) => {
    const ts = timestamp ?? "";
    let msg = `${ts} [${level}]: ${String(message)}`;

    if (Object.keys(metadata).length > 0) {
      msg += ` ${JSON.stringify(metadata)}`;
    }

    if (stack) {
      msg += `\n${typeof stack === "string" ? stack : JSON.stringify(stack)}`;
    }

    return msg;
  },
);

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  format: combine(
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat,
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),
  ],
});

// Add file transport in production
if (process.env.NODE_ENV === "production" && process.env.LOG_FILE) {
  logger.add(
    new winston.transports.File({
      filename: process.env.LOG_FILE,
      maxsize: parseInt(process.env.LOG_MAX_SIZE ?? "10485760", 10), // 10MB
      maxFiles: parseInt(process.env.LOG_MAX_FILES ?? "14", 10),
    }),
  );
}

/**
 * Create a child logger with context
 */
export function createLogger(context: string) {
  return logger.child({ context });
}

export default logger;
