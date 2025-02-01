import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone:true,
  imports: [NavbarComponent, CommonModule],
})
export class AdminComponent implements OnInit {
  dataList: any[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
        this.router.navigate(['/login']);
    }
    this.http.get('http://192.168.4.206:8084/api/data', { withCredentials: true })
        .subscribe(
            (response: any) => {
                this.dataList = response;
            },
            (error) => {
                console.error('Error al obtener los datos:', error);
                alert('Error al obtener los datos');
            }
        );
}
}