import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { BookService } from '@book/services';
import { BookSearchInterface } from '@book/models';
import { KEY_BOOKS } from '../book.constant';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'book-detail',
  standalone: true,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
  imports: [CommonModule, MatButtonModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent {
  #bookService = inject(BookService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  bookId = 0;
  isFromApi = 0;
  book$: Observable<BookSearchInterface>

  constructor() {
    this.#initializeComponent();
    this.book$ = this.getData$();
  }

  goToBooks() {
    this.#router.navigate(['/books']);
  }

  getData$() {
    if (this.isFromApi === 1) {
      return this.#bookService.getBookById$(this.bookId);
    } else {
      const books = JSON.parse(localStorage.getItem(KEY_BOOKS) || '[]') as Array<BookSearchInterface>;
      return of(books.find(p => p.id == this.bookId) || {} as BookSearchInterface);
    }
  }

  //#region Private Methods

  #initializeComponent() {
    const bookId = this.#route.snapshot.paramMap.get('bookId') || '';
    const isFromApi = this.#route.snapshot.paramMap.get('isFromApi') || '';

    this.bookId = parseInt(bookId);
    this.isFromApi = parseInt(isFromApi);
  }

  //#endregion Private Methods
}