import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  readonly books = signal<Book[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly deletingId = signal<number | null>(null);

  readonly hasBooks = computed(() => this.books().length > 0);

  ngOnInit(): void {
    this.loadBooks();
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

  deleteBook(book: Book): void {
    if (!confirm(`Delete "${book.Title}" by ${book.Author}?`)) return;
    this.deletingId.set(book.Id);
    this.bookService.delete(book.Id).subscribe({
      next: () => {
        this.books.update((list) => list.filter((b) => b.Id !== book.Id));
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
}
