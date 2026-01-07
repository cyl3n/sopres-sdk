import { describe, it, expect } from "@jest/globals";
import {
  isValidEmail,
  isValidUrl,
  isValidSlug,
  isStrongPassword,
  isValidHexColor,
  isValidPhoneNumber,
  sanitizeHtml,
  isValidFileSize,
  isValidFileType,
  isValidImageDimensions,
  validateRequiredFields,
  validateSchema,
  ValidationSchema,
} from "../validators";

describe("Validator Functions", () => {
  describe("isValidEmail", () => {
    it("should validate correct email addresses", () => {
      expect(isValidEmail("user@example.com")).toBe(true);
      expect(isValidEmail("test.user@domain.co.uk")).toBe(true);
      expect(isValidEmail("user+tag@example.com")).toBe(true);
    });

    it("should reject invalid email addresses", () => {
      expect(isValidEmail("invalid")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("user @example.com")).toBe(false);
      expect(isValidEmail("user@example")).toBe(false);
    });

    it("should handle empty string", () => {
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should validate correct URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://example.com")).toBe(true);
      expect(isValidUrl("https://example.com/path")).toBe(true);
      expect(isValidUrl("https://example.com:8080")).toBe(true);
      expect(isValidUrl("ftp://example.com")).toBe(true);
    });

    it("should reject invalid URLs", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
      expect(isValidUrl("example.com")).toBe(false);
      expect(isValidUrl("")).toBe(false);
      expect(isValidUrl("http://")).toBe(false);
    });
  });

  describe("isValidSlug", () => {
    it("should validate correct slugs", () => {
      expect(isValidSlug("hello-world")).toBe(true);
      expect(isValidSlug("my-blog-post")).toBe(true);
      expect(isValidSlug("test123")).toBe(true);
      expect(isValidSlug("a")).toBe(true);
    });

    it("should reject invalid slugs", () => {
      expect(isValidSlug("Hello-World")).toBe(false); // uppercase
      expect(isValidSlug("hello_world")).toBe(false); // underscore
      expect(isValidSlug("hello world")).toBe(false); // space
      expect(isValidSlug("hello--world")).toBe(false); // double hyphen
      expect(isValidSlug("-hello")).toBe(false); // leading hyphen
      expect(isValidSlug("hello-")).toBe(false); // trailing hyphen
      expect(isValidSlug("")).toBe(false); // empty
    });
  });

  describe("isStrongPassword", () => {
    it("should validate strong passwords", () => {
      expect(isStrongPassword("Password123")).toBe(true);
      expect(isStrongPassword("MyP@ssw0rd")).toBe(true);
      expect(isStrongPassword("Abcdefg1")).toBe(true);
    });

    it("should reject weak passwords", () => {
      expect(isStrongPassword("password")).toBe(false); // no uppercase, no number
      expect(isStrongPassword("PASSWORD123")).toBe(false); // no lowercase
      expect(isStrongPassword("Password")).toBe(false); // no number
      expect(isStrongPassword("Pass1")).toBe(false); // too short
      expect(isStrongPassword("")).toBe(false); // empty
    });
  });

  describe("isValidHexColor", () => {
    it("should validate correct hex colors", () => {
      expect(isValidHexColor("#000000")).toBe(true);
      expect(isValidHexColor("#FFFFFF")).toBe(true);
      expect(isValidHexColor("#abc")).toBe(true);
      expect(isValidHexColor("#ABC")).toBe(true);
      expect(isValidHexColor("#123456")).toBe(true);
    });

    it("should reject invalid hex colors", () => {
      expect(isValidHexColor("000000")).toBe(false); // missing #
      expect(isValidHexColor("#gg0000")).toBe(false); // invalid characters
      expect(isValidHexColor("#12")).toBe(false); // too short
      expect(isValidHexColor("#1234567")).toBe(false); // too long
      expect(isValidHexColor("")).toBe(false); // empty
    });
  });

  describe("isValidPhoneNumber", () => {
    it("should validate correct phone numbers", () => {
      expect(isValidPhoneNumber("+1234567890")).toBe(true);
      expect(isValidPhoneNumber("+491234567890")).toBe(true);
      expect(isValidPhoneNumber("1234567890")).toBe(true);
    });

    it("should handle formatted phone numbers", () => {
      expect(isValidPhoneNumber("+1 (234) 567-8900")).toBe(true);
      expect(isValidPhoneNumber("+49 123 456 7890")).toBe(true);
    });

    it("should reject invalid phone numbers", () => {
      expect(isValidPhoneNumber("abc")).toBe(false);
      expect(isValidPhoneNumber("+0123456789")).toBe(false); // starts with 0
      expect(isValidPhoneNumber("")).toBe(false);
    });
  });

  describe("sanitizeHtml", () => {
    it("should escape HTML special characters", () => {
      expect(sanitizeHtml('<script>alert("xss")</script>')).toBe(
        "&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;",
      );
    });

    it("should escape ampersands", () => {
      expect(sanitizeHtml("Tom & Jerry")).toBe("Tom &amp; Jerry");
    });

    it("should escape quotes", () => {
      expect(sanitizeHtml('He said "Hello"')).toBe("He said &quot;Hello&quot;");
      expect(sanitizeHtml("It's working")).toBe("It&#x27;s working");
    });

    it("should handle empty string", () => {
      expect(sanitizeHtml("")).toBe("");
    });

    it("should handle plain text", () => {
      expect(sanitizeHtml("Hello World")).toBe("Hello World");
    });
  });

  describe("isValidFileSize", () => {
    it("should validate file sizes within limit", () => {
      expect(isValidFileSize(1024, 2048)).toBe(true);
      expect(isValidFileSize(1, 1000)).toBe(true);
      expect(isValidFileSize(1000, 1000)).toBe(true); // exactly at limit
    });

    it("should reject file sizes over limit", () => {
      expect(isValidFileSize(2049, 2048)).toBe(false);
      expect(isValidFileSize(1001, 1000)).toBe(false);
    });

    it("should reject zero or negative sizes", () => {
      expect(isValidFileSize(0, 1000)).toBe(false);
      expect(isValidFileSize(-1, 1000)).toBe(false);
    });
  });

  describe("isValidFileType", () => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    it("should validate allowed file types", () => {
      expect(isValidFileType("image/jpeg", allowedTypes)).toBe(true);
      expect(isValidFileType("image/png", allowedTypes)).toBe(true);
      expect(isValidFileType("application/pdf", allowedTypes)).toBe(true);
    });

    it("should reject disallowed file types", () => {
      expect(isValidFileType("image/gif", allowedTypes)).toBe(false);
      expect(isValidFileType("text/plain", allowedTypes)).toBe(false);
      expect(isValidFileType("application/zip", allowedTypes)).toBe(false);
    });

    it("should handle empty allowed types", () => {
      expect(isValidFileType("image/jpeg", [])).toBe(false);
    });
  });

  describe("isValidImageDimensions", () => {
    it("should validate dimensions within limits", () => {
      expect(isValidImageDimensions(800, 600, 1920, 1080)).toBe(true);
      expect(isValidImageDimensions(1920, 1080, 1920, 1080)).toBe(true); // exactly at limit
      expect(isValidImageDimensions(1, 1, 100, 100)).toBe(true);
    });

    it("should reject dimensions over limits", () => {
      expect(isValidImageDimensions(1921, 1080, 1920, 1080)).toBe(false);
      expect(isValidImageDimensions(1920, 1081, 1920, 1080)).toBe(false);
      expect(isValidImageDimensions(2000, 2000, 1920, 1080)).toBe(false);
    });

    it("should reject zero or negative dimensions", () => {
      expect(isValidImageDimensions(0, 600, 1920, 1080)).toBe(false);
      expect(isValidImageDimensions(800, 0, 1920, 1080)).toBe(false);
      expect(isValidImageDimensions(-1, 600, 1920, 1080)).toBe(false);
    });
  });

  describe("validateRequiredFields", () => {
    it("should validate object with all required fields", () => {
      const obj = { name: "John", email: "john@example.com", age: 30 };
      const result = validateRequiredFields(obj, ["name", "email"]);
      expect(result.valid).toBe(true);
      expect(result.missing).toEqual([]);
    });

    it("should detect missing fields", () => {
      const obj: Record<string, unknown> = { name: "John" };
      const result = validateRequiredFields(obj, ["name", "email", "age"]);
      expect(result.valid).toBe(false);
      expect(result.missing).toEqual(["email", "age"]);
    });

    it("should detect null values as missing", () => {
      const obj = { name: "John", email: null };
      const result = validateRequiredFields(obj, ["name", "email"]);
      expect(result.valid).toBe(false);
      expect(result.missing).toEqual(["email"]);
    });

    it("should detect empty strings as missing", () => {
      const obj = { name: "John", email: "" };
      const result = validateRequiredFields(obj, ["name", "email"]);
      expect(result.valid).toBe(false);
      expect(result.missing).toEqual(["email"]);
    });

    it("should handle empty required fields array", () => {
      const obj = { name: "John" };
      const result = validateRequiredFields(obj, []);
      expect(result.valid).toBe(true);
      expect(result.missing).toEqual([]);
    });
  });

  describe("validateSchema", () => {
    it("should validate object matching schema", () => {
      const data = { name: "John", age: 30, email: "john@example.com" };
      const schema: ValidationSchema = {
        name: { required: true, type: "string", min: 2 },
        age: { required: true, type: "number", min: 18 },
        email: { required: true, type: "string" },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it("should detect required field violations", () => {
      const data = { name: "John" };
      const schema: ValidationSchema = {
        name: { required: true },
        email: { required: true },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe("email");
    });

    it("should detect type violations", () => {
      const data = { age: "30" };
      const schema: ValidationSchema = {
        age: { type: "number" },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain("type");
    });

    it("should validate string min length", () => {
      const data = { name: "Jo" };
      const schema: ValidationSchema = {
        name: { type: "string", min: 3 },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain("at least 3 characters");
    });

    it("should validate string max length", () => {
      const data = { name: "John Doe" };
      const schema: ValidationSchema = {
        name: { type: "string", max: 5 },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain("at most 5 characters");
    });

    it("should validate number min value", () => {
      const data = { age: 15 };
      const schema: ValidationSchema = {
        age: { type: "number", min: 18 },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain("at least 18");
    });

    it("should validate number max value", () => {
      const data = { age: 150 };
      const schema: ValidationSchema = {
        age: { type: "number", max: 120 },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain("at most 120");
    });

    it("should validate pattern", () => {
      const data = { code: "ABC123" };
      const schema: ValidationSchema = {
        code: { type: "string", pattern: /^[0-9]+$/ },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain("format is invalid");
    });

    it("should validate custom function", () => {
      const data = { value: 5 };
      const schema: ValidationSchema = {
        value: { custom: (v: unknown) => (v as number) > 10 },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain("validation failed");
    });

    it("should skip validation for optional empty fields", () => {
      const data = { name: "John" };
      const schema: ValidationSchema = {
        name: { required: true },
        email: { required: false, type: "string" },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(true);
    });

    it("should validate array type", () => {
      const data = { tags: ["tag1", "tag2"] };
      const schema: ValidationSchema = {
        tags: { type: "array" },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(true);
    });

    it("should collect multiple errors", () => {
      const data = { name: "", age: "invalid" };
      const schema: ValidationSchema = {
        name: { required: true },
        age: { required: true, type: "number" },
      };
      const result = validateSchema(data, schema);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
    });
  });
});
