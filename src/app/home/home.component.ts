import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  nombreAdministrador: string | null = '';
  apellidoAdministrador: string | null = '';

  ngOnInit() {
    this.nombreAdministrador = localStorage.getItem('nombreAdministrador');
    this.apellidoAdministrador = localStorage.getItem('apellidoAdministrador');
  }
}