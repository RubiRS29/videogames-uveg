import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  authImage = 'assets/images/auth.png';
  loginForm: FormGroup;
  errorMessage: string | null = null;  // 📌 Variable para manejar errores

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      ])
    });
  }

  onSubmit() {
    this.errorMessage = null; // Limpiar error anterior
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = this.authService.loginUser(email, password);
      
      if (!user) {
        this.errorMessage = 'Usuario o contraseña incorrectos.';  // 📌 Mensaje de error si el usuario no existe
      }
      this.router.navigate(['/games/list_games'])
    }
  }
}
