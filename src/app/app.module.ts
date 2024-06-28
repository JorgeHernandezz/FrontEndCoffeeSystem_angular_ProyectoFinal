import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { routes } from './app.routes';
import { CategoriasService } from './services/categorias/categorias.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CategoriasService
  ]
})
export class AppModule { }
