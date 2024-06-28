import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
    this.fetchDetails();
  }
  fetchDetails() {
    this.http.get('https://backend-categoriasproductos-springboot.onrender.com/api/categorias').subscribe(
      (resp:any) => {
        console.log(resp);
      }
    )
  }
  titulo = 'Coffee System';
  nombre : string = "Cofee System";
}
