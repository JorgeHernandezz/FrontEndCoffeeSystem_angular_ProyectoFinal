import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = 'https://backendcoffeesystem-proyectofinal.onrender.com/api/pedidos';

  constructor(private http: HttpClient) {}

  actualizarPedido(pedido: any): Observable<any> {
    const url = `${this.apiUrl}/actualizarPedido/${pedido.nombrePedido}`;
    return this.http.put<any>(url, pedido);
  }
}
