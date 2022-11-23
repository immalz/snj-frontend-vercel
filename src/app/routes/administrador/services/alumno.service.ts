import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private URL = environment.URL + 'alumno';

  constructor(private http: HttpClient, private router: Router) { }

  obtenerAlumnos(): any {
    return this.http.get(this.URL);
  }

  obtenerAlumno(id: string): any {
    return this.http.get(`${this.URL}/${id}`);
  }

  actualizarAlumno(id: string, alumno): any {
    return this.http.put(`${this.URL}/${id}`, alumno);
  }

  eliminarAlumno(id: string): any {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
