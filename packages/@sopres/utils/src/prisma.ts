export function isPostgres(): boolean {
  return process.env.DATABASE_URL?.startsWith("postgres") || false;
}

/**
 * Safe JSON parse for Prisma fields that might be either string (SQLite) or object (PostgreSQL)
 */
export function parsePrismaJson<T = unknown>(value: unknown): T {
  if (value === null || value === undefined) {
    return {} as T;
  }
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value as unknown as T;
    }
  }
  return value as T;
}

/**
 * Prepare JSON value for Prisma based on the database type
 */
export function serializePrismaJson(value: unknown): unknown {
  if (value === null || value === undefined) {
    return null;
  }
  if (isPostgres()) {
    // Postgres (Json type) wants the object
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        // If it's not valid JSON, return as is
        return value;
      }
    }
    return value;
  }
  // SQLite (String type) wants a JSON-encoded string
  // We always stringify to ensure things like strings are properly encoded (e.g. "default" -> "\"default\"")
  return JSON.stringify(value);
}
