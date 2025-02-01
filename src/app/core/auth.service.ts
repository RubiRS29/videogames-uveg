import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../clases/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersSource = new BehaviorSubject<User[]>(this.loadUsersFromStorage());
  users$ = this.usersSource.asObservable();

  constructor(private router: Router) { }

  private loadUsersFromStorage(): User[] {
    if (typeof localStorage !== 'undefined') {  // Verifica si localStorage está disponible
      const savedUsers = localStorage.getItem('users');
      return savedUsers ? JSON.parse(savedUsers) : [];
    }
    return [];
  }

  addUser(user: User): void {
    const users = this.usersSource.value;
    user.image = "assets/images/user.png";

    const updatedUsers = [...users, user];
    this.usersSource.next(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  loginUser(email: string, password: string): User | null {
    if (typeof localStorage !== 'undefined') {
      const savedUsers = localStorage.getItem('users');
      const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        user.isLogin = true;
        console.log(user)
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      return null
    }
    return null;
  }

  isLoginUser(): boolean {
    if (typeof localStorage !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      const user: User | null = savedUser ? JSON.parse(savedUser) : null;
      return !!user?.isLogin
    }
    return false;
  }


  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
