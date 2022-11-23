import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { Alumno } from 'src/app/interfaces/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  URL = environment.URL + 'alumno';

  estudiante;

  constructor(private http: HttpClient, private router: Router) { }


  obtenerEstudiantes(alumno: Alumno): any {
    return this.http.get<any>(this.URL);
  }

  obtenerEstudiante(id: string): any {
    return this.http.get<any>(`${this.URL}/${id}`);
  }
}
