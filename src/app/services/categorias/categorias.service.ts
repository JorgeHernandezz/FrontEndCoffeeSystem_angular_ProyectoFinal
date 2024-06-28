import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../Model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  apiUrl: string = 'https://backend-categoriasproductos-springboot.onrender.com/api/categorias';
  apiUrlCategoria: string = 'https://backend-categoriasproductos-springboot.onrender.com/api/categoria';

  constructor(private httpClient: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.apiUrl);
  }

  getCategoria(id: string): Observable<Categoria> {
    const url = `${this.apiUrlCategoria}/${id}`; // Construir la URL para obtener una categoría por su ID
    return this.httpClient.get<Categoria>(url);
  }

  actualizarCategoria(categoria: Categoria): Observable<any> {
    const url = `${this.apiUrlCategoria}/actualizar/${categoria.idcategoria}`;
    return this.httpClient.put(url, categoria, { responseType: 'text' });
  }


  insertarCategoria(categoria: Categoria): Observable<any> {
    const url = `${this.apiUrlCategoria}/insertar`;
    return this.httpClient.post(url, categoria, { responseType: 'text' });
  }
  
  
  eliminarCategoria(id: number): Observable<any> {
    const url = `${this.apiUrlCategoria}/eliminar/${id}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }









}
