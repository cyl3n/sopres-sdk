import { z, ZodSchema } from "zod";
import { ValidationError } from "../errors";

/**
 * Validate data against a Zod schema
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validated data
 * @throws ValidationError if validation fails
 */
export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.format());
  }

  return result.data;
}

/**
 * Common validation schemas
 */
export const commonSchemas = {
  id: z.string().cuid(),
  email: z.string().email(),
  url: z.string().url(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  pagination: z.object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10),
  }),
};
