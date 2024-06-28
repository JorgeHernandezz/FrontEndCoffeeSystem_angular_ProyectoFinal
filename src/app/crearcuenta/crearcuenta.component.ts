import { Component } from '@angular/core';
import { HeaderauthComponent } from '../headerauth/headerauth.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crearcuenta',
  standalone: true,
  imports: [HeaderauthComponent, CommonModule,FormsModule],
  templateUrl: './crearcuenta.component.html',
  styleUrl: './crearcuenta.component.css'
})
export class CrearCuentaComponent {
  nombre = '';
  apellido = '';
  email = '';
  password = '';
  confirmPassword = '';
  estiloNombre = '';
  estiloApellido = '';
  estiloEmail = '';
  estiloPassword = '';
  estiloConfirmPass = '';
  mensajeRespuesta = '';
  estiloRespuesta = '';

  apiUrl = 'https://backendcoffeesystem-proyectofinal.onrender.com/api/administrador';

  constructor(private router: Router, private http: HttpClient) {}

  validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  validarEnvio(): void {
    if ([this.nombre, this.apellido, this.email, this.password, this.confirmPassword].includes('')) {
      this.estiloNombre = this.nombre ? '' : 'p-invalid';
      this.estiloApellido = this.apellido ? '' : 'p-invalid';
      this.estiloEmail = this.email ? '' : 'p-invalid';
      this.estiloPassword = this.password ? '' : 'p-invalid';
      this.estiloConfirmPass = this.confirmPassword ? '' : 'p-invalid';
      this.mensajeRespuesta = 'Por favor completa todos los campos.';
      this.estiloRespuesta = 'error';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    } else {
      this.estiloNombre = '';
      this.estiloApellido = '';
      this.estiloEmail = '';
      this.estiloPassword = '';
      this.estiloConfirmPass = '';
    }

    if (!this.validarEmail.test(this.email)) {
      this.estiloEmail = 'p-invalid';
      this.mensajeRespuesta = 'Por favor ingresa un correo válido.';
      this.estiloRespuesta = 'error';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    } else {
      this.estiloEmail = '';
    }

    if (this.password !== this.confirmPassword) {
      this.estiloPassword = 'p-invalid';
      this.estiloConfirmPass = 'p-invalid';
      this.mensajeRespuesta = 'Las contraseñas no coinciden.';
      this.estiloRespuesta = 'error';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    } else {
      this.estiloPassword = '';
      this.estiloConfirmPass = '';
    }

    this.enviarDatosBackend();
  }

  async enviarDatosBackend() {
    try {
      const respuesta = await this.http.post<any>(this.apiUrl, {
        nombreAdministrador: this.nombre,
        apellidoAdministrador: this.apellido,
        passwordAdministrador: this.password,
        emailAdministrador: this.email
      }).toPromise();
      if (respuesta) {
        this.mensajeRespuesta = 'Cuenta creada exitosamente.';
        this.estiloRespuesta = 'success';
        setTimeout(() => { this.router.navigate(['/tokenconfirmar']); }, 1000);
      }
      setTimeout(() => { this.router.navigate(['/tokenconfirmar']); }, 1000);
    } catch (error: any) {
      if (error && error.error && error.error.msg) {
        this.mensajeRespuesta = error.error.msg;
      } else {
        this.mensajeRespuesta = 'Error al intentar crear la cuenta.';
      }
      this.estiloRespuesta = 'error';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
    }
  }
}
