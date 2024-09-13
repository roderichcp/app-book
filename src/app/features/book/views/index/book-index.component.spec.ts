import { TestBed } from '@angular/core/testing';
import { BookIndexComponent } from './book-index.component';
import { provideHttpClient } from '@angular/common/http';

describe('BookIndexComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookIndexComponent],
      providers: [
        provideHttpClient(),
      ]
    }).compileComponents();
  });

  it('should create the BookIndex', () => {
    const fixture = TestBed.createComponent(BookIndexComponent);
    const bookIndexApp = fixture.componentInstance;
    expect(bookIndexApp).toBeTruthy();
  });

  it(`should 'itemsSource' be an array`, () => {
    const fixture = TestBed.createComponent(BookIndexComponent);
    const bookIndexApp = fixture.componentInstance;
    expect(bookIndexApp.itemsSource).toBeInstanceOf(Array);
  });
});