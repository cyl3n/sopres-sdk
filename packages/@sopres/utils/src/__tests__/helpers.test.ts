import { describe, it, expect } from "@jest/globals";
import {
  slugify,
  truncate,
  capitalize,
  formatBytes,
  formatDate,
  formatRelativeTime,
  randomString,
  parseQueryString,
  buildQueryString,
  getFileExtension,
  getMimeType,
} from "../helpers";

describe("Helper Functions", () => {
  describe("slugify", () => {
    it("should convert text to lowercase slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
    });

    it("should replace spaces with hyphens", () => {
      expect(slugify("Multiple   Spaces")).toBe("multiple-spaces");
    });

    it("should remove special characters", () => {
      expect(slugify("Hello! @World# $Test%")).toBe("hello-world-test");
    });

    it("should handle multiple consecutive hyphens", () => {
      expect(slugify("Hello---World")).toBe("hello-world");
    });

    it("should trim leading and trailing hyphens", () => {
      expect(slugify("-Hello World-")).toBe("hello-world");
    });

    it("should handle empty string", () => {
      expect(slugify("")).toBe("");
    });

    it("should handle unicode characters", () => {
      expect(slugify("Café München")).toBe("caf-mnchen");
    });
  });

  describe("truncate", () => {
    it("should truncate text longer than specified length", () => {
      const text = "This is a very long text that needs truncation";
      expect(truncate(text, 20)).toBe("This is a very lo...");
    });

    it("should not truncate text shorter than specified length", () => {
      const text = "Short text";
      expect(truncate(text, 20)).toBe("Short text");
    });

    it("should use custom suffix", () => {
      const text = "This is a long text";
      expect(truncate(text, 10, "…")).toBe("This is a…");
    });

    it("should handle exact length match", () => {
      const text = "Exact";
      expect(truncate(text, 5)).toBe("Exact");
    });

    it("should handle empty string", () => {
      expect(truncate("", 10)).toBe("");
    });
  });

  describe("capitalize", () => {
    it("should capitalize first letter and lowercase rest", () => {
      expect(capitalize("hello")).toBe("Hello");
    });

    it("should handle already capitalized text", () => {
      expect(capitalize("HELLO")).toBe("Hello");
    });

    it("should handle mixed case", () => {
      expect(capitalize("hELLO wORLD")).toBe("Hello world");
    });

    it("should handle single character", () => {
      expect(capitalize("a")).toBe("A");
    });

    it("should handle empty string", () => {
      expect(capitalize("")).toBe("");
    });
  });

  describe("formatBytes", () => {
    it("should format 0 bytes", () => {
      expect(formatBytes(0)).toBe("0 Bytes");
    });

    it("should format bytes", () => {
      expect(formatBytes(500)).toBe("500 Bytes");
    });

    it("should format kilobytes", () => {
      expect(formatBytes(1024)).toBe("1 KB");
    });

    it("should format megabytes", () => {
      expect(formatBytes(1048576)).toBe("1 MB");
    });

    it("should format gigabytes", () => {
      expect(formatBytes(1073741824)).toBe("1 GB");
    });

    it("should format with custom decimals", () => {
      expect(formatBytes(1536, 0)).toBe("2 KB");
      expect(formatBytes(1536, 1)).toBe("1.5 KB");
    });

    it("should handle large numbers", () => {
      expect(formatBytes(1099511627776)).toBe("1 TB");
    });
  });

  describe("formatDate", () => {
    it("should format Date object", () => {
      const date = new Date("2024-01-15T12:00:00Z");
      const formatted = formatDate(date, "en-US");
      expect(formatted).toContain("January");
      expect(formatted).toContain("15");
      expect(formatted).toContain("2024");
    });

    it("should format date string", () => {
      const formatted = formatDate("2024-01-15", "en-US");
      expect(formatted).toContain("January");
      expect(formatted).toContain("15");
      expect(formatted).toContain("2024");
    });

    it("should handle different locales", () => {
      const date = new Date("2024-01-15T12:00:00Z");
      const formatted = formatDate(date, "de-DE");
      expect(formatted).toContain("Januar");
    });
  });

  describe("formatRelativeTime", () => {
    it('should return "just now" for recent time', () => {
      const now = new Date();
      expect(formatRelativeTime(now)).toBe("just now");
    });

    it("should return minutes ago", () => {
      const date = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
      expect(formatRelativeTime(date)).toBe("5 minutes ago");
    });

    it("should return singular minute", () => {
      const date = new Date(Date.now() - 1 * 60 * 1000); // 1 minute ago
      expect(formatRelativeTime(date)).toBe("1 minute ago");
    });

    it("should return hours ago", () => {
      const date = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3 hours ago
      expect(formatRelativeTime(date)).toBe("3 hours ago");
    });

    it("should return singular hour", () => {
      const date = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1 hour ago
      expect(formatRelativeTime(date)).toBe("1 hour ago");
    });

    it("should return days ago", () => {
      const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
      expect(formatRelativeTime(date)).toBe("2 days ago");
    });

    it("should return formatted date for old dates", () => {
      const date = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
      const formatted = formatRelativeTime(date);
      expect(formatted).not.toContain("ago");
    });

    it("should handle date strings", () => {
      const date = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      expect(formatRelativeTime(date)).toBe("5 minutes ago");
    });
  });

  describe("randomString", () => {
    it("should generate string of default length", () => {
      const result = randomString();
      expect(result).toHaveLength(16);
    });

    it("should generate string of specified length", () => {
      expect(randomString(10)).toHaveLength(10);
      expect(randomString(32)).toHaveLength(32);
    });

    it("should only contain alphanumeric characters", () => {
      const result = randomString(100);
      expect(result).toMatch(/^[A-Za-z0-9]+$/);
    });

    it("should generate different strings", () => {
      const str1 = randomString();
      const str2 = randomString();
      expect(str1).not.toBe(str2);
    });

    it("should handle length of 0", () => {
      expect(randomString(0)).toBe("");
    });
  });

  describe("parseQueryString", () => {
    it("should parse simple query string", () => {
      const result = parseQueryString("foo=bar&baz=qux");
      expect(result).toEqual({ foo: "bar", baz: "qux" });
    });

    it("should handle URL-encoded values", () => {
      const result = parseQueryString("name=John%20Doe&city=New%20York");
      expect(result).toEqual({ name: "John Doe", city: "New York" });
    });

    it("should handle empty query string", () => {
      const result = parseQueryString("");
      expect(result).toEqual({});
    });

    it("should handle single parameter", () => {
      const result = parseQueryString("key=value");
      expect(result).toEqual({ key: "value" });
    });

    it("should handle parameters without values", () => {
      const result = parseQueryString("key1=&key2=value");
      expect(result).toEqual({ key1: "", key2: "value" });
    });
  });

  describe("buildQueryString", () => {
    it("should build query string from object", () => {
      const result = buildQueryString({ foo: "bar", baz: "qux" });
      expect(result).toBe("foo=bar&baz=qux");
    });

    it("should skip undefined values", () => {
      const result = buildQueryString({ foo: "bar", baz: undefined });
      expect(result).toBe("foo=bar");
    });

    it("should skip null values", () => {
      const result = buildQueryString({ foo: "bar", baz: null });
      expect(result).toBe("foo=bar");
    });

    it("should handle empty object", () => {
      const result = buildQueryString({});
      expect(result).toBe("");
    });

    it("should convert numbers to strings", () => {
      const result = buildQueryString({ page: 1, limit: 20 });
      expect(result).toBe("page=1&limit=20");
    });

    it("should handle boolean values", () => {
      const result = buildQueryString({ active: true, deleted: false });
      expect(result).toBe("active=true&deleted=false");
    });

    it("should URL-encode special characters", () => {
      const result = buildQueryString({ name: "John Doe", city: "New York" });
      expect(result).toContain("John+Doe");
      expect(result).toContain("New+York");
    });
  });

  describe("getFileExtension", () => {
    it("should extract file extension", () => {
      expect(getFileExtension("document.pdf")).toBe("pdf");
    });

    it("should handle multiple dots", () => {
      expect(getFileExtension("archive.tar.gz")).toBe("gz");
    });

    it("should handle files without extension", () => {
      expect(getFileExtension("README")).toBe("");
    });

    it("should handle hidden files", () => {
      expect(getFileExtension(".gitignore")).toBe("");
    });

    it("should handle paths with directories", () => {
      expect(getFileExtension("/path/to/file.txt")).toBe("txt");
    });

    it("should be case-sensitive", () => {
      expect(getFileExtension("image.PNG")).toBe("PNG");
    });
  });

  describe("getMimeType", () => {
    it("should return correct MIME type for images", () => {
      expect(getMimeType("jpg")).toBe("image/jpeg");
      expect(getMimeType("jpeg")).toBe("image/jpeg");
      expect(getMimeType("png")).toBe("image/png");
      expect(getMimeType("gif")).toBe("image/gif");
      expect(getMimeType("webp")).toBe("image/webp");
      expect(getMimeType("svg")).toBe("image/svg+xml");
    });

    it("should return correct MIME type for documents", () => {
      expect(getMimeType("pdf")).toBe("application/pdf");
      expect(getMimeType("doc")).toBe("application/msword");
      expect(getMimeType("docx")).toBe(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      );
    });

    it("should return correct MIME type for text files", () => {
      expect(getMimeType("txt")).toBe("text/plain");
      expect(getMimeType("html")).toBe("text/html");
      expect(getMimeType("css")).toBe("text/css");
      expect(getMimeType("js")).toBe("text/javascript");
      expect(getMimeType("json")).toBe("application/json");
    });

    it("should handle case-insensitive extensions", () => {
      expect(getMimeType("PDF")).toBe("application/pdf");
      expect(getMimeType("JPG")).toBe("image/jpeg");
    });

    it("should return default MIME type for unknown extensions", () => {
      expect(getMimeType("unknown")).toBe("application/octet-stream");
      expect(getMimeType("xyz")).toBe("application/octet-stream");
    });
  });
});
