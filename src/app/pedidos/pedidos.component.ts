import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { PedidosFormComponent } from '../pedidosform/pedidosform.component';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, MatDialogModule, HeaderComponent],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  titulo: string = 'Pedidos';
  listaPedidos: any[] = [];

  pageSize = 5;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(): void {
    this.httpClient.get<any[]>('http://localhost:4000/api/pedidos/mostrarPedidos').subscribe({
      next: (pedidos) => {
        this.listaPedidos = pedidos;
        this.totalPages = Math.ceil(this.listaPedidos.length / this.pageSize);
      },
      error: (err) => {
        console.error('Error al obtener los pedidos:', err);
      }
    });
  }


  get paginatedPedidos(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.listaPedidos.slice(start, end);
  }

  cambiarPagina(event: Event, page: number): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }





  abrirDialogAgregar(): void {
    const dialogRef = this.dialog.open(PedidosFormComponent, {
      width: '600px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPedidos();
      }
    });
  }

  abrirDialogActualizar(pedido: any): void {
    const dialogRef = this.dialog.open(PedidosFormComponent, {
      width: '600px',
      data: { pedido }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPedidos(); // Actualizar la lista después de actualizar el pedido
      }
    });
  }

  eliminarPedido(nombrePedido: string): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar este pedido?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpClient.delete(`https://backendcoffeesystem-proyectofinal.onrender.com/api/pedidos/eliminarPedido/${nombrePedido}`).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El pedido ha sido eliminado.', 'success');
            this.getPedidos();
          },
          error: (err) => {
            console.error('Error al eliminar el pedido:', err);
            Swal.fire('¡Error!', 'No se pudo eliminar el pedido', 'error');
          }
        });
      }
    });
  }

  @ViewChild('content') content!: ElementRef;

  descargarPDF() {
    const url = 'https://backendcoffeesystem-proyectofinal.onrender.com/api/pedidos/generar-pdf-pedidos';
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const urlBlob = window.URL.createObjectURL(blob);
        window.open(urlBlob);
      },
      (error: any) => {
        console.error('Error al descargar PDF de pedidos:', error);
        // Manejar el error en tu aplicación Angular
      }
    );
  }
}
