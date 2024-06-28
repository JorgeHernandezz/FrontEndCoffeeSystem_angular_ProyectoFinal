import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { provideHttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common';

import { routes } from './app.routes';
import { CategoriasService } from './services/categorias/categorias.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), HttpClient, HttpClientModule, provideHttpClient(), CategoriasService, provideAnimationsAsync()],
  
};
