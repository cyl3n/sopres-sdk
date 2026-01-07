import { PrismaClient } from "@prisma/client";

/**
 * Base Repository for database operations
 * Provides common CRUD operations for all entities
 */
// Minimal interface for Prisma delegates to enable dynamic access type safety
interface RepositoryDelegate<T> {
  create(args: { data: unknown }): Promise<T>;
  findUnique(args: { where: unknown }): Promise<T | null>;
  findMany(args: { where?: unknown }): Promise<T[]>;
  update(args: { where: unknown; data: unknown }): Promise<T>;
  delete(args: { where: unknown }): Promise<T>;
  count(args: { where?: unknown }): Promise<number>;
}

export abstract class BaseRepository<T> {
  protected tableName: string;
  protected prisma: PrismaClient;

  constructor(tableName: string, prisma: PrismaClient) {
    this.tableName = tableName;
    this.prisma = prisma;
  }

  // Helper to safely get the delegate
  protected get delegate(): RepositoryDelegate<T> {
    return this.prisma[this.tableName] as RepositoryDelegate<T>;
  }

  /**
   * Create a new entity
   */
  async create(entity: Partial<T>): Promise<T> {
    return this.delegate.create({
      data: entity,
    });
  }

  /**
   * Find entity by ID
   */
  async findById(id: string): Promise<T | null> {
    return this.delegate.findUnique({
      where: { id },
    });
  }

  /**
   * Find all entities with optional filtering
   */
  async findAll(where?: unknown): Promise<T[]> {
    return this.delegate.findMany({
      where,
    });
  }

  /**
   * Update entity by ID
   */
  async update(id: string, patch: Partial<T>): Promise<T> {
    return this.delegate.update({
      where: { id },
      data: patch,
    });
  }

  /**
   * Delete entity by ID
   */
  async delete(id: string): Promise<void> {
    await this.delegate.delete({
      where: { id },
    });
  }

  /**
   * Count entities with optional filtering
   */
  async count(where?: unknown): Promise<number> {
    return this.delegate.count({
      where,
    });
  }
}
