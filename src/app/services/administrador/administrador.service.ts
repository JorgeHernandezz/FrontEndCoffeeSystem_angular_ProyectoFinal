import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private apiUrl = 'https://backendcoffeesystem-proyectofinal.onrender.com/api';

  constructor(private http: HttpClient) {}

  getAdministradorPorCorreo(email: string) {
    return this.http.get<any>(`${this.apiUrl}/administrador/mostrarPorCorreo/${email}`);
  }
}
