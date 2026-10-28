import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  // REGISTRO
  async registrarse(email: string, password: string, nombre: string) {
    try {
      const resultado = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(resultado.user, { displayName: nombre }); // 👈 guarda el nombre
      return resultado;
    } catch (error: any) {
      throw this.manejarError(error);
    }
  }

  // LOGIN
  async iniciarSesion(email: string, password: string) {
    try {
      const resultado = await signInWithEmailAndPassword(this.auth, email, password);
      return resultado;
    } catch (error: any) {
      throw this.manejarError(error);
    }
  }

  // CERRAR SESIÓN
  async cerrarSesion() {
    await signOut(this.auth);
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  // OBTENER USUARIO ACTUAL
  getUsuarioActual() {
    return this.auth.currentUser;
  }

  // MENSAJES DE ERROR EN ESPAÑOL
  private manejarError(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Este correo ya está registrado';
      case 'auth/invalid-email':
        return 'El correo no es válido';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos';
      default:
        return 'Ocurrió un error, intenta de nuevo';
    }
  }
}