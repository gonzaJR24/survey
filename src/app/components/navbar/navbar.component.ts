import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  imgUrl:string='https://raw.githubusercontent.com/gonzaJR24/kpi_front/refs/heads/main/Logo-fondo-blanco.png';

  constructor(private routes:Router, private http:HttpClient){}

  logout() {
    const url: string = "http://192.168.4.206:8084/api/users/logout";
  
    this.http.post(url, {}, { withCredentials: true }).subscribe(
      (response: any) => {
        console.log("Logout successful:", response);
        this.routes.navigate(['/']); // Redirect to login page
      },
      error => {
        console.log(error);
        alert("Error al cerrar sesión");
      }
    );
  }
}
