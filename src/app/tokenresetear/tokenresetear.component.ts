import { HeaderauthComponent } from './../headerauth/headerauth.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-tokenresetear',
  standalone: true,
  imports: [CommonModule,FormsModule, HeaderauthComponent],
  templateUrl: './tokenresetear.component.html',
  styleUrls: ['./tokenresetear.component.css']
})
export class TokenResetearComponent {
  token: string = '';
  password: string = '';
  confirmPass: string = '';
  estiloToken: boolean = false;
  estiloPassword: boolean = false;
  estiloConfirmPass: boolean = false;
  mensajeRespuesta: string = '';
  estiloRespuesta: string = '';
  mostrarFormularioPassword: boolean = false;

  private tokenResetearPassword: string = 'https://backendcoffeesystem-proyectofinal.onrender.com/api/administrador/olvide-password/';
  private campoVacio: string = 'Token vacío';
  private longitudTokenInvalida: string = 'Longitud del token inválida';
  private passwordInvalido: string = 'La contraseña debe tener al menos 6 caracteres';
  private passwordsInValidas: string = 'Las contraseñas no coinciden';
  private tokenExpirado: string = 'Token expirado';
  private exitoResetPassword: string = 'Contraseña cambiada exitosamente.';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  async confirmarUsuario() {
    if (!this.token) {
      this.estiloToken = true;
      this.mensajeRespuesta = this.campoVacio;
      this.estiloRespuesta = 'danger';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    }

    try {
      const respuesta: any = await this.http.get(this.tokenResetearPassword + this.token).toPromise();
      console.log("Respuesta recibida:", respuesta);
      this.mostrarFormularioPassword = true;
    
      if (respuesta && respuesta.status === 200) {
        this.estiloToken = false;
        
      }
    } catch (error: any) {
      console.error("Error en la solicitud GET:", error);
    
      if (error.status === 403) {
        this.estiloToken = true;
        this.estiloRespuesta = 'danger';
        this.mensajeRespuesta = error.error.msg || 'Acceso denegado.';
      } else if (error.status === 401) {
        this.estiloToken = true;
        this.estiloRespuesta = 'danger';
        this.mensajeRespuesta = 'No autorizado para realizar esta acción.';
      } else {
        this.estiloToken = true;
        this.mensajeRespuesta = 'Error desconocido al verificar el token.';
      }
    
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
    }
    
  }

  async nuevoPassword() {
    if (!this.password || this.password.length < 6) {
      this.estiloPassword = true;
      this.estiloRespuesta = 'danger';
      this.mensajeRespuesta = this.passwordInvalido;
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    }

    if (this.password !== this.confirmPass) {
      this.estiloPassword = true;
      this.estiloConfirmPass = true;
      this.estiloRespuesta = 'danger';
      this.mensajeRespuesta = this.passwordsInValidas;
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
      return;
    }

    try {
      const body = { nuevaPassword: this.password };
      const respuesta: any = await this.http.post(this.tokenResetearPassword + this.token, body).toPromise();
      console.log("Respuesta recibida:", respuesta);
      
        this.mensajeRespuesta = this.exitoResetPassword;
        this.estiloRespuesta = 'success';
        setTimeout(() => { this.router.navigate(['/']); }, 1000);
    } catch (error: any) {
      this.estiloRespuesta = 'danger';
      this.mensajeRespuesta = error.error.msg || 'Error al cambiar la contraseña.';
      setTimeout(() => { this.mensajeRespuesta = ''; }, 3000);
    }
  }
}
