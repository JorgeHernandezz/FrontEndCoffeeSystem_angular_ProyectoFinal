import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderauthComponent } from '../headerauth/headerauth.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tokencrear',
  standalone: true,
  imports: [CommonModule,FormsModule,HeaderauthComponent],
  templateUrl: './tokencrear.component.html',
  styleUrl: './tokencrear.component.css'
})
export class TokencrearComponent {
    token: string = '';
    password: string = '';
    confirmPass: string = '';
    estiloToken: boolean = false;
    estiloPassword: boolean = false;
    estiloConfirmPass: boolean = false;
    mensajeRespuesta: string = '';
    estiloRespuesta: string = '';
    mostrarFormularioPassword: boolean = false;
  
    private tokenConfirmar: string = 'https://backendcoffeesystem-proyectofinal.onrender.com/api/administrador/confirmar/';
    private campoVacio: string = 'Token vacío';
    private longitudTokenInvalida: string = 'Longitud del token inválida';
    private tokenExpirado: string = 'Token expirado';
  
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
        const respuesta: any = await this.http.get(this.tokenConfirmar + this.token).toPromise();
        console.log("Respuesta recibida:", respuesta);
      
        if (respuesta && respuesta.status === 200) {
          this.estiloToken = false;
          setTimeout(() => { this.router.navigate(['/iniciarsesion']); }, 1000);
        }
        setTimeout(() => { this.router.navigate(['/iniciarsesion']); }, 1000);
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
  }
  