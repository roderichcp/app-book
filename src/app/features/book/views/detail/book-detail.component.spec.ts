import { TestBed } from '@angular/core/testing';
import { BookDetailComponent } from './book-detail.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('BookDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailComponent, RouterModule.forRoot([])],
      providers: [
        provideHttpClient(),
      ]
    }).compileComponents();
  });

  it('should create the BookDetail', () => {
    const fixture = TestBed.createComponent(BookDetailComponent);
    const bookDetailApp = fixture.componentInstance;
    expect(bookDetailApp).toBeTruthy();
  });
});