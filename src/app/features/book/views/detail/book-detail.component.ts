import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { BookService } from '@book/services';
import { BookSearchInterface } from '@book/models';
import { KEY_BOOKS } from '../book.constant';

@Component({
  selector: 'book-detail',
  standalone: true,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
  imports: [CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent {
  #bookService = inject(BookService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  data = {} as BookSearchInterface;
  bookId = 0;
  isFromApi = 0;

  constructor() {
    this.#initializeComponent();
    this.#loadData();
  }

  goToBooks() {
    this.#router.navigate(['/books']);
  }

  closeDialog() {
    // this.#dialogRef.close();
  }

  //#region Private Methods

  #initializeComponent() {
    const bookId = this.#route.snapshot.paramMap.get('bookId') || '';
    const isFromApi = this.#route.snapshot.paramMap.get('isFromApi') || '';

    this.bookId = parseInt(bookId);
    this.isFromApi = parseInt(isFromApi);
  }

  #loadData() {
    if (this.isFromApi === 1) {
      this.#bookService.getBookById$(this.bookId)
        .subscribe({
          next: (value: BookSearchInterface) => {
            console.log(value);
            this.data = value;
          },
          error: (e) => console.log(e)
        });
    } else {
      const books = JSON.parse(localStorage.getItem(KEY_BOOKS) || '[]') as Array<BookSearchInterface>;
      this.data = books.find(p => p.id == this.bookId) || {} as BookSearchInterface;
    }
  }

  //#endregion Private Methods
}