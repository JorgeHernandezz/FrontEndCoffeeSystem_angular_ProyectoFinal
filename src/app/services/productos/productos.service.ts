import { Producto } from './../../Model/producto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  apiUrl: string = 'https://backendcoffeesystem-proyectofinal.onrender.com/api/productos/mostrarProductos';
  apiUrlProductos ='https://backendcoffeesystem-proyectofinal.onrender.com/api/productos';

  constructor(private httpClient: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.httpClient.get<{ products: Producto[] }>(this.apiUrl).pipe(
      map(response => response.products)
    );
  }

  agregarProducto(nuevoProducto: any): Observable<any> {
    const url = `${this.apiUrlProductos}/agregarProducto`;
    return this.httpClient.post<any>(url, nuevoProducto);
  }


  eliminarProducto(nombreProducto: string): Observable<any> {
    const url = `${this.apiUrlProductos}/eliminarProducto/${nombreProducto}`;
    return this.httpClient.delete(url);
  }

  actualizarProducto(nombreProducto: string, producto: any): Observable<Producto> {
    return this.httpClient.put<Producto>(`https://backendcoffeesystem-proyectofinal.onrender.com/api/productos/actualizarProducto/${nombreProducto}`, producto);
  }
  
}
