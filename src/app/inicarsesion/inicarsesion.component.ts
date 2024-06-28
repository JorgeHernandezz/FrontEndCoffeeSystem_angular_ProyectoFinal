import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderauthComponent } from '../headerauth/headerauth.component';

@Component({
  selector: 'app-inicarsesion',
  standalone: true,
  imports: [FormsModule,CommonModule, HeaderauthComponent],
  templateUrl: './inicarsesion.component.html',
  styleUrl: './inicarsesion.component.css'
})
export class InicarsesionComponent {
  signIn = true;
  email = '';
  password = '';
  emailrecuperar = '';
  estiloEmail = '';
  estiloPassword = '';
  estiloEmailRec = '';
  estiloRespuesta = '';
  mensajeRespuesta = '';

  apiUrl = 'https://backendcoffeesystem-proyectofinal.onrender.com/api'
  constructor(private router: Router, private http: HttpClient) {}

  validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  validarEnvio(): void {
    if ([this.email, this.password].includes('')) {
      this.estiloEmail = 'p-invalid';
      this.estiloPassword = 'p-invalid';
      this.estiloRespuesta = 'error';
      this.mensajeRespuesta = 'Campos vacíos';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    } else {
      this.estiloEmail = '';
      this.estiloPassword = '';
    }
    if (!this.validarEmail.test(this.email)) {
      this.estiloEmail = 'p-invalid';
      this.mensajeRespuesta = 'Email inválido';
      this.estiloRespuesta = 'error';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    } else { this.estiloEmail = ''; }
    if (this.password.length < 6) {
      this.estiloPassword = 'p-invalid';
      this.mensajeRespuesta = 'Contraseña inválida';
      this.estiloRespuesta = 'error';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    } else { this.estiloPassword = ''; }
    this.enviarDatosBackend();
  }

  async enviarDatosBackend() {
    try {
      const respuesta = await this.http.post<any>(`${this.apiUrl}/administrador/iniSes`, {
        emailAdministrador: this.email,
        passwordAdministrador: this.password
      }).toPromise();
      if (respuesta && respuesta.token) {
        localStorage.setItem('token', respuesta.token);
        
        const administrador = await this.http.get<any>(`${this.apiUrl}/administrador/mostrarPorCorreo/${this.email}`).toPromise();
      localStorage.setItem('nombreAdministrador', administrador.nombreAdministrador);
      localStorage.setItem('apellidoAdministrador', administrador.apellidoAdministrador);
      setTimeout(() => { this.router.navigate(['/home']); }, 1000);
      }
    } catch (error: any) {
      if (error && error.error && error.error.msg) {
        this.mensajeRespuesta = error.error.msg;
      } else {
        this.mensajeRespuesta = 'Error desconocido al iniciar sesión';
      }
      this.estiloRespuesta = 'error';
      this.estiloEmail = 'p-invalid';
      this.estiloPassword = 'p-invalid';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
    }
  }
  

  async recuperarPassword() {
    if ([this.emailrecuperar].includes('')) {
      this.estiloEmailRec = 'p-invalid';
      this.mensajeRespuesta = 'Campo vacío';
      this.estiloRespuesta = 'error';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    } else { this.estiloEmailRec = ''; }
    if (!this.validarEmail.test(this.emailrecuperar)) {
      this.estiloEmailRec = 'p-invalid';
      this.mensajeRespuesta = 'Email inválido';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    } else { this.estiloEmailRec = ''; }
    this.enviarRecuperacionPassword();
  }

  async enviarRecuperacionPassword() {
    try {
      const respuesta = await this.http.post<any>(`${this.apiUrl}/administrador/olvide-password`, {
        emailAdministrador: this.emailrecuperar
      }).toPromise();
      if (respuesta) {
        this.emailrecuperar = '';
        this.estiloRespuesta = 'success';
        this.mensajeRespuesta = 'Cooreo válido';
        setTimeout(() => { this.router.navigate(['/tokenresetear']); }, 1000);
      }
    } catch (error: any) {
      if (error && error.error && error.error.msg) {
        this.mensajeRespuesta = error.error.msg;
      } else {
        this.mensajeRespuesta = 'Error desconocido al intentar recuperar contraseña';
      }
      this.estiloEmailRec = 'p-invalid';
      this.estiloRespuesta = 'error';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
    }
  }
  
}
