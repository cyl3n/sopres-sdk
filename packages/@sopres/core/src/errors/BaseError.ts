/**
 * Base error class for all application errors
 */
export class BaseError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    status: number = 500,
    code: string = "INTERNAL_ERROR",
    isOperational: boolean = true,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * 404 Not Found Error
 */
export class NotFoundError extends BaseError {
  constructor(
    message: string = "Resource not found",
    code: string = "NOT_FOUND",
    details?: Record<string, unknown>,
  ) {
    super(message, 404, code, true, details);
  }
}

/**
 * 400 Validation Error
 */
export class ValidationError extends BaseError {
  public readonly errors?: unknown;

  constructor(
    message: string = "Validation failed",
    errors?: unknown,
    code: string = "VALIDATION_ERROR",
  ) {
    super(message, 400, code, true, {
      errors: errors as Record<string, unknown>,
    });
    this.errors = errors;
  }
}

/**
 * 401 Authentication Error
 */
export class AuthenticationError extends BaseError {
  constructor(
    message: string = "Authentication failed",
    code: string = "AUTHENTICATION_ERROR",
    details?: Record<string, unknown>,
  ) {
    super(message, 401, code, true, details);
  }
}

/**
 * 403 Authorization Error
 */
export class AuthorizationError extends BaseError {
  constructor(
    message: string = "Access denied",
    code: string = "AUTHORIZATION_ERROR",
    details?: Record<string, unknown>,
  ) {
    super(message, 403, code, true, details);
  }
}

/**
 * 409 Conflict Error
 */
export class ConflictError extends BaseError {
  constructor(
    message: string = "Resource conflict",
    code: string = "CONFLICT",
    details?: Record<string, unknown>,
  ) {
    super(message, 409, code, true, details);
  }
}

/**
 * 429 Rate Limit Error
 */
export class RateLimitError extends BaseError {
  constructor(message: string = "Too many requests", retryAfter?: number) {
    super(
      message,
      429,
      "RATE_LIMIT_EXCEEDED",
      true,
      retryAfter ? { retryAfter } : undefined,
    );
  }
}

/**
 * 500 Database Error
 */
export class DatabaseError extends BaseError {
  constructor(
    message: string = "Database operation failed",
    code: string = "DATABASE_ERROR",
    details?: Record<string, unknown>,
  ) {
    super(message, 500, code, false, details); // Not operational
  }
}

/**
 * 503 Service Unavailable Error
 */
export class ServiceUnavailableError extends BaseError {
  constructor(
    message: string = "Service unavailable",
    code: string = "SERVICE_UNAVAILABLE",
    details?: Record<string, unknown>,
  ) {
    super(message, 503, code, false, details);
  }
}

/**
 * 400 File Upload Error
 */
export class FileUploadError extends BaseError {
  constructor(
    message: string = "File upload failed",
    code: string = "FILE_UPLOAD_ERROR",
    details?: Record<string, unknown>,
  ) {
    super(message, 400, code, true, details);
  }
}

/**
 * 422 Custom Fields Error
 */
export class CustomFieldsError extends BaseError {
  constructor(
    message: string = "Custom fields validation failed",
    code: string = "CUSTOM_FIELDS_ERROR",
    details?: Record<string, unknown>,
  ) {
    super(message, 422, code, true, details);
  }
}

/**
 * Error Response Interface
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string;
    path?: string;
  };
}

/**
 * Helper to create standardized error response
 */
export function createErrorResponse(
  err: BaseError,
  path?: string,
): ErrorResponse {
  return {
    success: false,
    error: {
      code: err.code,
      message: err.message,
      timestamp: new Date().toISOString(),
      path,
      details: err.details,
    },
  };
}

/**
 * Helper to check if error is operational
 */
export function isOperationalError(error: Error): boolean {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}
