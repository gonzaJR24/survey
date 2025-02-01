import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.http.post('http://192.168.4.206:8084/api/users/login', { username, password }, { withCredentials: true })
        .subscribe(
            (response: any) => {
                localStorage.setItem('currentUser', JSON.stringify(response));
                if (this.isAdmin()) {
                    this.router.navigate(['/admin']);
                } else if (this.isUser()) {
                    this.router.navigate(['/user']);
                }
            },
            (error) => {
                console.error('Error en el login:', error);
                alert('Credenciales incorrectas o problema de conexión');
            }
        );
}

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return !!currentUser.username; // Devuelve true si el usuario está autenticado
  }

  isAdmin(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.username === 'admin';
  }

  isUser(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.username.includes('caja');
  }
}