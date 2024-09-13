import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'books',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/book/views/index/book-index.component').then((m) => m.BookIndexComponent),
    data: { preload: true }
  },
  {
    path: 'book/detail/:bookId/:isFromApi',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/book/views/detail/book-detail.component').then((m) => m.BookDetailComponent),
    data: { preload: true }
  },
  {
    path: 'books/list',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/book/views/book-list/book-list.component').then((m) => m.BookListComponent),
    data: { preload: true }
  },
];
