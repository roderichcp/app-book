import { TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent]
    }).compileComponents();
  });

  it('should create the BookList', () => {
    const fixture = TestBed.createComponent(BookListComponent);
    const bookListApp = fixture.componentInstance;
    expect(bookListApp).toBeTruthy();
  });
});