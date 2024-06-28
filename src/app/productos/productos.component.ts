import { HttpClient } from '@angular/common/http';
import { ProductosFormComponent } from './../productos-form/productos-form.component';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../Model/producto';
import { ProductosService } from '../services/productos/productos.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ProductoAddComponent } from '../producto-add/producto-add.component';
import { HeaderComponent } from '../header/header.component';
import { ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, MatDialogModule, HeaderComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  titulo: string = 'Productos';
  listaProductos: Producto[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private HttpClient: HttpClient,
    private productosService: ProductosService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (productos) => {
        this.listaProductos = productos;
        this.totalPages = Math.ceil(this.listaProductos.length / this.pageSize);
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err);
      }
    });
  }

  get paginatedProductos(): Producto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.listaProductos.slice(start, end);
  }

  cambiarPagina(event: Event, page: number): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  abrirDialogAgregar(): void {
    const dialogRef = this.dialog.open(ProductoAddComponent, {
      width: '600px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductos();
      }
    });
  }

  abrirDialogActualizar(producto: Producto): void {
    const dialogRef = this.dialog.open(ProductosFormComponent, {
      width: '600px',
      data: { producto }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductos(); // Actualizar la lista después de actualizar el producto
      }
    });
  }

  eliminarProducto(nombreProducto: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.eliminarProducto(nombreProducto).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
            this.getProductos();
          },
          error: (err) => {
            console.error('Error al eliminar el producto:', err);
            Swal.fire('¡Error!', 'No se pudo eliminar el producto', 'error');
          }
        });
      }
    });
  }

  @ViewChild('content') content!: ElementRef;

  descargarPDF() {
    const url = 'https://backendcoffeesystem-proyectofinal.onrender.com/api/productos/generar-pdf-productos';
    this.HttpClient.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const urlBlob = window.URL.createObjectURL(blob);
        window.open(urlBlob);
      },
      (error: any) => {
        console.error('Error al descargar PDF de productos:', error);
        // Manejar el error en tu aplicación Angular
      }
    );
  }
}
