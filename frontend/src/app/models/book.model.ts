/**
 * Book entity matching the backend API model (PascalCase from .NET API).
 */
export interface Book {
  Id: number;
  Title: string;
  Author: string;
  Isbn: string;
  PublicationDate: string; // ISO date string from API (DateOnly)
}

/**
 * Request payload for creating a new book.
 */
export interface CreateBookRequest {
  Title: string;
  Author: string;
  Isbn: string;
  PublicationDate: string;
}

/**
 * Request payload for updating an existing book (all fields optional).
 */
export interface UpdateBookRequest {
  Title?: string;
  Author?: string;
  Isbn?: string;
  PublicationDate?: string;
}
