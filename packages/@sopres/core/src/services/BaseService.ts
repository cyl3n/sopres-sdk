import { BaseRepository } from "../db/BaseRepository";

/**
 * Base Service for business logic
 * Provides common service operations wrapping repository calls
 */
export class BaseService<T> {
  constructor(protected repo: BaseRepository<T>) {}

  /**
   * Create a new entity
   */
  async create(payload: Partial<T>): Promise<T> {
    return this.repo.create(payload);
  }

  /**
   * Get entity by ID
   */
  async get(id: string): Promise<T | null> {
    return this.repo.findById(id);
  }

  /**
   * Get all entities with optional filtering
   */
  async getAll(where?: unknown): Promise<T[]> {
    return this.repo.findAll(where);
  }

  /**
   * Update entity by ID
   */
  async update(id: string, patch: Partial<T>): Promise<T> {
    return this.repo.update(id, patch);
  }

  /**
   * Delete entity by ID
   */
  async delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }

  /**
   * Count entities with optional filtering
   */
  async count(where?: unknown): Promise<number> {
    return this.repo.count(where);
  }
}
