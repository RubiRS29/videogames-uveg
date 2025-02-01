import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  logo = 'assets/images/logo.png';

  constructor(private authService: AuthService, private router: Router){}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
