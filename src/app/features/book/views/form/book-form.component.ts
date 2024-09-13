import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule, MatLabel } from '@angular/material/input';

import { BookService } from '@book/services';
import { BookForm, BookFormParamInterface, BookSearchInterface } from '@book/models';
import { KEY_BOOKS } from '../book.constant';

@Component({
  selector: 'book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule, MatDialogTitle, MatDialogContent, MatInputModule, MatDatepickerModule, MatDialogActions,
    MatButton, FormsModule, MatLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent {
  readonly #dialogRef = inject(MatDialogRef<BookFormComponent>);
  readonly param = inject<BookFormParamInterface>(MAT_DIALOG_DATA);
  #changeDetectorRef = inject(ChangeDetectorRef);

  #bookService = inject(BookService);

  entityForm = new BookForm();
  isFromApi = signal(this.param.isFromApi);
  msgCandEdit = computed(() => this.isFromApi() ? 'No disponible para EDITAR' : '');

  constructor() {
    this.#loadData();
  }

  cancel() {
    this.#dialogRef.close(false);
  }

  save() {
    let books = JSON.parse(localStorage.getItem(KEY_BOOKS) || '[]') as Array<BookSearchInterface>;

    if (this.param.bookId > 0) {
      const bookIndex = books.findIndex(p => p.id === this.param.bookId);

      if (bookIndex > 0) {
        let bookToSave = this.#createEntityToSave();
        bookToSave.id = this.param.bookId;
        books[bookIndex] = bookToSave;
        localStorage.setItem(KEY_BOOKS, JSON.stringify(books));
      }

    } else {
      const ids = books.map(p => p.id);
      const lastId = Math.max(...ids);
      let bookToSave = this.#createEntityToSave();
      bookToSave.id = lastId + 1;
      books.push(bookToSave);
      localStorage.setItem(KEY_BOOKS, JSON.stringify(books));
    }

    this.#dialogRef.close(true);
  }

  //#region Private Methods

  #loadData() {
    if (this.param.bookId > 0) {
      if (this.param.isFromApi) {
        this.#bookService.getBookById$(this.param.bookId)
          .subscribe({
            next: (value: BookSearchInterface) => {
              this.entityForm.title = value.title;
              this.entityForm.description = value.description;
              this.entityForm.urlImg = value.imgUrl;
              this.entityForm.pageCount = value.pageCount;
              this.entityForm.publishDate = value.publishDate;
              this.#changeDetectorRef.markForCheck();
            }
          })
      } else {
        let books = JSON.parse(localStorage.getItem(KEY_BOOKS) || '[]') as Array<BookSearchInterface>;
        const book = books.find(p => p.id === this.param.bookId);

        if (book) {
          this.entityForm.title = book.title;
          this.entityForm.description = book.description;
          this.entityForm.urlImg = book.imgUrl;
          this.entityForm.pageCount = book.pageCount;
          this.entityForm.publishDate = book.publishDate;
        }
      }
    }
  }

  #createEntityToSave() {
    const bookToSave = {
      title: this.entityForm.title,
      description: this.entityForm.description,
      imgUrl: this.entityForm.urlImg,
      pageCount: this.entityForm.pageCount,
      publishDate: this.entityForm.publishDate,
      isFromApi: false
    } as BookSearchInterface;

    return bookToSave;
  }

  //#endregion Private Methods
}