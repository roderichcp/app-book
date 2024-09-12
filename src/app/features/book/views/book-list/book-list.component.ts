import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { BookSearchInterface } from '@book/models';
import { KEY_BOOKS } from '../book.constant';

@Component({
  selector: 'book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  imports: [CommonModule, MatCardModule]
})
export class BookListComponent {
  books!: Array<BookSearchInterface>;

  constructor() {
    this.#loadData();
  }

  //#region Private Methods

  #loadData() {
    this.books = JSON.parse(localStorage.getItem(KEY_BOOKS) || '[]') as Array<BookSearchInterface>;
  }

  //#endregion Private Methods
}