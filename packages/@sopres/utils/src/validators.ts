/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate slug (lowercase, alphanumeric, hyphens only)
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Validate password strength
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
 */
export function isStrongPassword(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  return (
    password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers
  );
}

/**
 * Validate hex color code
 */
export function isValidHexColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

/**
 * Validate phone number (basic international format)
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ""));
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Validate file size
 */
export function isValidFileSize(size: number, maxSize: number): boolean {
  return size > 0 && size <= maxSize;
}

/**
 * Validate file type
 */
export function isValidFileType(
  mimeType: string,
  allowedTypes: string[],
): boolean {
  return allowedTypes.includes(mimeType);
}

/**
 * Validate image dimensions
 */
export function isValidImageDimensions(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
): boolean {
  return width > 0 && height > 0 && width <= maxWidth && height <= maxHeight;
}

/**
 * Validate required fields in an object
 */
export function validateRequiredFields<T extends Record<string, unknown>>(
  obj: T,
  requiredFields: (keyof T)[],
): { valid: boolean; missing: string[] } {
  const missing = requiredFields.filter((field) => {
    const value = obj[field];
    return value === undefined || value === null || value === "";
  });

  return {
    valid: missing.length === 0,
    missing: missing as string[],
  };
}

/**
 * Validate object against schema
 */
export interface ValidationRule {
  required?: boolean;
  type?: "string" | "number" | "boolean" | "array" | "object";
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validateSchema(
  data: Record<string, unknown>,
  schema: ValidationSchema,
): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  for (const [field, rule] of Object.entries(schema)) {
    const value = data[field];

    // Required check
    if (
      rule.required &&
      (value === undefined || value === null || value === "")
    ) {
      errors.push({ field, message: `${field} is required` });
      continue;
    }

    // Skip further validation if field is not required and empty
    if (
      !rule.required &&
      (value === undefined || value === null || value === "")
    ) {
      continue;
    }

    // Type check
    if (rule.type) {
      const actualType = Array.isArray(value) ? "array" : typeof value;
      if (actualType !== rule.type) {
        errors.push({
          field,
          message: `${field} must be of type ${rule.type}`,
        });
        continue;
      }
    }

    // Min/Max for strings and numbers
    if (rule.min !== undefined) {
      if (typeof value === "string" && value.length < rule.min) {
        errors.push({
          field,
          message: `${field} must be at least ${rule.min} characters`,
        });
      } else if (typeof value === "number" && value < rule.min) {
        errors.push({
          field,
          message: `${field} must be at least ${rule.min}`,
        });
      }
    }

    if (rule.max !== undefined) {
      if (typeof value === "string" && value.length > rule.max) {
        errors.push({
          field,
          message: `${field} must be at most ${rule.max} characters`,
        });
      } else if (typeof value === "number" && value > rule.max) {
        errors.push({ field, message: `${field} must be at most ${rule.max}` });
      }
    }

    // Pattern check
    if (
      rule.pattern &&
      typeof value === "string" &&
      !rule.pattern.test(value)
    ) {
      errors.push({ field, message: `${field} format is invalid` });
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      errors.push({ field, message: `${field} validation failed` });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
