import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BookService } from '@book/services';
import { BookFormComponent } from '../form/book-form.component';
import { BookFormParamInterface, BookSearchInterface } from '@book/models';
import { KEY_BOOKS, KEY_GET_BOOKS_API } from '../book.constant';

@Component({
  selector: 'book-index',
  standalone: true,
  templateUrl: './book-index.component.html',
  styleUrl: './book-index.component.scss',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatTableModule]
})
export class BookIndexComponent {
  #bookService = inject(BookService);
  #router = inject(Router);
  readonly #dialog = inject(MatDialog);

  itemsSource = new Array<BookSearchInterface>();
  displayedColumns!: Array<string>;
  #isGetFromApi = false;

  constructor() {
    this.#initializeComponent();
    this.#searchBooks();
  }

  goToDetail(book: BookSearchInterface) {
    this.#router.navigate(['/book/detail', book.id, book.isFromApi ? 1 : 0]);
  }

  openForm(book: BookSearchInterface | null = null) {
    const param = book ?
      { bookId: book.id, isFromApi: book.isFromApi } as BookFormParamInterface :
      { bookId: 0, isFromApi: false } as BookFormParamInterface;

    this.#dialog.open(BookFormComponent, {
      width: '500px',
      data: param
    })
      .afterClosed()
      .subscribe({
        next: (response: boolean) => {
          if (response)
            this.#searchBooks();
        },
        error: (e) => console.log(e)
      });
  }

  //#region Private Methods

  #initializeComponent() {
    let getFromApi = localStorage.getItem(KEY_GET_BOOKS_API);

    if (!getFromApi)
      localStorage.setItem(KEY_GET_BOOKS_API, 'true');

    this.#isGetFromApi = localStorage.getItem(KEY_GET_BOOKS_API) === 'true';

    this.displayedColumns = [
      'title',
      'description',
      'pageCount',
      'publishDate',
      'actions'
    ];
  }

  #searchBooks() {
    if (this.#isGetFromApi) {
      this.#bookService.searchBooks$()
        .subscribe({
          next: (value: Array<BookSearchInterface>) => {
            value.forEach(item => item.isFromApi = true);
            console.log(value, 'RODRIGO');
            this.itemsSource = value;
            localStorage.setItem(KEY_BOOKS, JSON.stringify(value));
            localStorage.setItem(KEY_GET_BOOKS_API, 'false');
            this.#isGetFromApi = false;
          },
          error: (e) => console.log(e)
        });
    } else {
      this.itemsSource = JSON.parse(localStorage.getItem(KEY_BOOKS) || '[]') as Array<BookSearchInterface>;
    }
  }

  //#endregion Private Methods
}