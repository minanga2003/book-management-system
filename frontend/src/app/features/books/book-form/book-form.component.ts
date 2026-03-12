import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import type { CreateBookRequest } from '../../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isEdit = computed(() => this.editedId() !== null);
  readonly editedId = signal<number | null>(null);
  readonly loading = signal(true);
  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(500)]],
    author: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(/^[A-Za-z\s]+$/)]],
    isbn: ['', [Validators.required, Validators.maxLength(20)]],
    publicationDate: ['', Validators.required],
  });

  openPublicationDatePicker(input: HTMLInputElement): void {
    const anyInput = input as HTMLInputElement & { showPicker?: () => void };
    if (typeof anyInput.showPicker === 'function') {
      anyInput.showPicker();
    } else {
      input.focus();
      input.click();
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numId = parseInt(id, 10);
      if (!Number.isNaN(numId)) {
        this.editedId.set(numId);
        this.loadBook(numId);
        return;
      }
    }
    this.loading.set(false);
  }

  private loadBook(id: number): void {
    this.bookService.getById(id).subscribe({
      next: (book) => {
        this.form.patchValue({
          title: book.Title,
          author: book.Author,
          isbn: book.Isbn,
          publicationDate: book.PublicationDate,
        });
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message ?? 'Failed to load book');
        this.loading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.submitting()) return;
    this.error.set(null);
    this.submitting.set(true);

    const raw = this.form.getRawValue();
    const payload: CreateBookRequest = {
      Title: raw.title,
      Author: raw.author,
      Isbn: raw.isbn,
      PublicationDate: raw.publicationDate,
    };

    const id = this.editedId();
    if (id !== null) {
      this.bookService.update(id, payload).subscribe({
        next: () => {
          this.submitting.set(false);
          this.router.navigate(['/'], { queryParams: { updated: 1 } });
        },
        error: (err: Error) => {
          this.error.set(err.message ?? 'Failed to update book');
          this.submitting.set(false);
        },
      });
    } else {
      this.bookService.create(payload).subscribe({
        next: () => {
          this.submitting.set(false);
          this.router.navigate(['/'], { queryParams: { created: 1 } });
        },
        error: (err: Error) => {
          this.error.set(err.message ?? 'Failed to create book');
          this.submitting.set(false);
        },
      });
    }
  }
}
