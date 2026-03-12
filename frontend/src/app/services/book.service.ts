import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import type { Book, CreateBookRequest, UpdateBookRequest } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/books`;

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl).pipe(
      catchError((err) => throwError(() => this.normalizeError(err)))
    );
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => throwError(() => this.normalizeError(err)))
    );
  }

  create(request: CreateBookRequest): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, request).pipe(
      catchError((err) => throwError(() => this.normalizeError(err)))
    );
  }

  update(id: number, request: UpdateBookRequest): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, request).pipe(
      catchError((err) => throwError(() => this.normalizeError(err)))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => throwError(() => this.normalizeError(err)))
    );
  }

  private normalizeError(err: unknown): Error {
    if (err instanceof Error) return err;
    if (typeof err === 'object' && err !== null && 'error' in err) {
      const body = (err as { error?: { message?: string } }).error;
      return new Error(body?.message ?? 'An error occurred');
    }
    return new Error('An error occurred');
  }
}
