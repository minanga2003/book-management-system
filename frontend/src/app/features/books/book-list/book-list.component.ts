import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';
import type { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly route = inject(ActivatedRoute);

  readonly books = signal<Book[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);
  readonly deletingId = signal<number | null>(null);
  readonly confirmDeleteBookSignal = signal<Book | null>(null);
  private successTimeoutId: number | null = null;

  readonly hasBooks = computed(() => this.books().length > 0);

  ngOnInit(): void {
    this.loadBooks();
    const qp = this.route.snapshot.queryParamMap;
    if (qp.get('updated') === '1') {
      this.setSuccess('Book updated successfully.');
    } else if (qp.get('created') === '1') {
      this.setSuccess('Book added successfully.');
    }
  }

  loadBooks(): void {
    this.loading.set(true);
    this.error.set(null);
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books.set(data);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message ?? 'Failed to load books');
        this.loading.set(false);
      },
    });
  }

  askDelete(book: Book): void {
    this.error.set(null);
    this.clearSuccess();
    this.confirmDeleteBookSignal.set(book);
  }

  cancelDelete(): void {
    this.confirmDeleteBookSignal.set(null);
  }

  confirmDelete(): void {
    const book = this.confirmDeleteBookSignal();
    if (!book) return;

    this.confirmDeleteBookSignal.set(null);
    this.deletingId.set(book.Id);
    this.bookService.delete(book.Id).subscribe({
      next: () => {
        this.books.update((list) => list.filter((b) => b.Id !== book.Id));
        this.setSuccess(`"${book.Title}" deleted successfully.`);
        this.deletingId.set(null);
      },
      error: (err: Error) => {
        this.error.set(err.message ?? 'Failed to delete book');
        this.deletingId.set(null);
      },
    });
  }

  isDeleting(id: number): boolean {
    return this.deletingId() === id;
  }

  private setSuccess(message: string): void {
    this.success.set(message);
    if (this.successTimeoutId !== null) {
      window.clearTimeout(this.successTimeoutId);
    }
    this.successTimeoutId = window.setTimeout(() => {
      this.success.set(null);
      this.successTimeoutId = null;
    }, 2000);
  }

  private clearSuccess(): void {
    this.success.set(null);
    if (this.successTimeoutId !== null) {
      window.clearTimeout(this.successTimeoutId);
      this.successTimeoutId = null;
    }
  }
}
