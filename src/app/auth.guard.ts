import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const isLogin = this.authService.isLoginUser(); // Verifica si hay un usuario guardado

    if (isLogin) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/auth/login']); // Redirige a login si no hay usuario
      return false;
    }
  }
}