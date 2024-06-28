import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductosService } from '../services/productos/productos.service';
import { Producto } from '../Model/producto';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos-form',
  standalone: true,
  templateUrl: './productos-form.component.html',
  imports: [FormsModule],
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {
  producto: Producto;

  constructor(
    private productosService: ProductosService,
    private dialogRef: MatDialogRef<ProductosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto }
  ) {
    this.producto = { ...data.producto }; // Clonar el producto para evitar modificar el original directamente
  }

  ngOnInit(): void {}

  actualizarProducto(): void {
    // Mostrar cuadro de diálogo de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Preparar el objeto actualizado
        const updatedProducto = {
          nombreProducto: this.producto.nombreProducto,
          descrProducto: this.producto.descrProducto,
          cantidadInv: this.producto.cantidadInv,
          precioProducto: this.producto.precioProducto,
          descuentoProducto: this.producto.descuentoProducto,
          categoriaProducto: this.producto.categoriaProducto
        };
  
        // Llamar al servicio para actualizar el producto
        this.productosService.actualizarProducto(this.producto.nombreProducto, updatedProducto).subscribe({
          next: (producto) => {
            Swal.fire('¡Éxito!', 'Producto actualizado correctamente', 'success');
            this.dialogRef.close(producto);
          },
          error: (err) => {
            console.error('Error al actualizar el producto:', err);
            Swal.fire('¡Error!', 'No se pudo actualizar el producto', 'error');
          }
        });
      }
    });
  }
  

  

  cerrarDialog(): void {
    this.dialogRef.close();
  }
}