import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Sector } from '../../model/sector';
import { SectorService } from '../../services/sector.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-survey-app',
  templateUrl: './survey-app.component.html',
  styleUrls: ['./survey-app.component.css'],
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule]
})
export class SurveyAppComponent implements OnInit {
  sectors: Sector[] = [];
  formData: any = {
    entrada: '',
    hcu: '',
    numero: '',
    medio: '',
    municipio: '',
    sector: ''
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private sectorService: SectorService) { }

  ngOnInit(): void {
    this.sectors = this.sectorService.getSector().filter(sector => sector.municipio_id == 3201 || sector.municipio_id == 3202 || sector.municipio_id == 3203 ||
      sector.municipio_id == 3207 || sector.municipio_id == 3205 || sector.municipio_id == 3204 || sector.municipio_id == 3206
    ).sort((a, b) => a.sector.localeCompare(b.sector));;
    if (!this.authService.isUser()) {
      this.router.navigate(['/login']);
    }
  }

  submit(form: NgForm) {
    if (form.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const url = 'http://192.168.4.206:8084/api/data';
    this.formData.username = JSON.parse(localStorage.getItem('currentUser') || '{}').username;
    this.http.post(url, this.formData).subscribe(response => {
      setTimeout(() => {
        Swal.fire({
          title: "Enviado!",
          text: "💪",
          icon: "success"
        });
      }, 2000);
      this.formData = {
        entrada: '',
        hcu: '',
        numero: '',
        medio: '',
        municipio: '',
        sector: ''
      };
      form.resetForm();
    });
  }
}