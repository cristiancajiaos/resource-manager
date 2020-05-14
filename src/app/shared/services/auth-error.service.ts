import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorService {

  constructor(
    private toastr: ToastrService
  ) { }

  showError(error: string) {
    switch (error) {
      case "auth/cors-unsupported": {
        this.toastr.error(
          "No hay soporte para el navegador que se está usando"
        );
        break;
      }

      case "auth/email-already-in-use": {
        this.toastr.error("El correo ingresado ya está registrado");
        break;
      }

      case "auth/network-request-failed": {
        this.toastr.error(
          "Hubo un problema de comunicación con el servidor (timeout, conexión interumpida)."
        );
        break;
      }

      case "auth/no-auth-event": {
        this.toastr.error("Ocurrió un error interno.");
        break;
      }

      case "auth/too-many-requests": {
        this.toastr.error("Por actividad inusual, se bloquearon las solicitudes desde este dispositivo. Inténtalo más tarde.");
        break;
      }

      case "auth/user-disabled": {
        this.toastr.error("Esta cuenta fue desactivada por un administrador.");
        break;
      }

      case "auth/user-not-found": {
        this.toastr.error("La cuenta con la que intentas ingresar, no está registrada.");
        break;
      }

      case "auth/wrong-password": {
        this.toastr.error(
          "La contraseña que ingresaste, no corresponde a la cuenta que se quiere usar para ingresar."
        );
        break;
      }

      default: {
        this.toastr.error("Ocurrió un error desconocido");
        break;
      }
    }
  }
}
