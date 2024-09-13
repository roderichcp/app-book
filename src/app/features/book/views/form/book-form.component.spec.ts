import { TestBed } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';

describe('BookFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookFormComponent, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        provideHttpClient(),
      ]
    }).compileComponents();
  });

  it('should create the BookForm', () => {
    const fixture = TestBed.createComponent(BookFormComponent);
    const bookFormApp = fixture.componentInstance;
    expect(bookFormApp).toBeTruthy();
  });
});