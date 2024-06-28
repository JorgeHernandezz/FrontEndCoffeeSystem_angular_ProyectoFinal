import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PedidosService } from '../services/pedidos/pedidos.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidosform',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './pedidosform.component.html',
  styleUrls: ['./pedidosform.component.css']
})
export class PedidosFormComponent implements OnInit {
  pedido: any;

  constructor(
    private dialogRef: MatDialogRef<PedidosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pedidosService: PedidosService
  ) {
    this.pedido = { ...data.pedido };
  }

  ngOnInit(): void {}

  actualizarPedido(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar este pedido?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Preparar el objeto actualizado
        const updatedPedido = {
          idPedido: this.pedido.idPedido, // Asegúrate de incluir el ID del pedido
          nombrePedido: this.pedido.nombrePedido,
          totalArticulos: this.pedido.totalArticulos,
          costoArticulos: this.pedido.costoArticulos,
          costoEnvio: 0,
          costoTotal: this.pedido.totalArticulos*this.pedido.costoArticulos,
          metodoPago: this.pedido.metodoPago,
          detallesPedido: [
            {
              producto_P: this.pedido.detallesPedido[0].producto_P,
              cantidad_P: this.pedido.totalArticulos,
              totalParcial_P: this.pedido.totalArticulos*this.pedido.costoArticulos
            }
          ]
        };

        // Llamar al servicio para actualizar el pedido
        this.pedidosService.actualizarPedido(updatedPedido).subscribe({
          next: (pedidoActualizado) => {
            Swal.fire('¡Éxito!', 'Pedido actualizado correctamente', 'success');
            this.dialogRef.close(pedidoActualizado);
          },
          error: (error) => {
            console.error('Error al actualizar el pedido:', error);
            Swal.fire('¡Error!', 'No se pudo actualizar el pedido', 'error');
          }
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
