import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { PreloadingBookRoute } from './preloading';

export const appConfig: ApplicationConfig = {
  providers: [
    PreloadingBookRoute,
    provideRouter(routes, withPreloading(PreloadingBookRoute)), 
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};
