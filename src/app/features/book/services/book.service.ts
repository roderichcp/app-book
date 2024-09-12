import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BookSearchInterface } from '@book/models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  /** URL Books Controller from FakeRESTApi.Web API Version 1.0.0 */
  #booksControllerV1: string;

  constructor(private http: HttpClient) {
    this.#booksControllerV1 = `https://fakerestapi.azurewebsites.net/api/v1`;
  }

  //#region GET

  searchBooks$() {
    return this.http.get<Array<BookSearchInterface>>(`${this.#booksControllerV1}/books`)
      .pipe(
        takeUntilDestroyed(),
        map((items: Array<BookSearchInterface>) => items.filter((item: BookSearchInterface) => item.id <= 5))
      );
  }

  getBookById$(bookId: number) {
    return this.http.get<BookSearchInterface>(`${this.#booksControllerV1}/books/${bookId}`)
      .pipe(
        takeUntilDestroyed()
      );
  }

  //#endregion GET
}