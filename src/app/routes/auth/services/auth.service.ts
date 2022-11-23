import { Profesor } from './../../../interfaces/profesor';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import { Alumno } from 'src/app/interfaces/alumno';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  studentFound;
  teacherFound;

  isAdmin;

  private URL = environment.URL + 'auth';

  constructor(private http: HttpClient, private router: Router) { }

  signUp(alumno: Alumno, img: File): any {

    const formData = new FormData();

    formData.append('nombre', alumno.nombre);
    formData.append('correo', alumno.correo);
    formData.append('contraseña', alumno.contraseña);
    formData.append('edad', alumno.edad);
    formData.append('direccion', alumno.direccion);
    formData.append('grado', alumno.grado);
    formData.append('foto', img);

    return this.http.post<any>(this.URL + '/signup', formData);
  }

  signIn(alumno: Alumno): any {
    return this.http.post<any>(this.URL + '/signin', alumno);
  }

  signUpDocente(profesor: Profesor): any {
    return this.http.post<any>(this.URL + '/docente/signup', profesor);
  }

  signInDocente(profesor: Profesor): any {
    return this.http.post<any>(this.URL + '/docente/signin', profesor);
  }

  getRol(): any {
    return localStorage.getItem('rol');
  }

  loggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }


  loggout(): any {

    if (localStorage.getItem('rol') === 'director' || localStorage.getItem('rol') === 'profesor') {
      this.router.navigate(['/docente/acceso']);
      localStorage.removeItem('docente');
    } else {
      this.router.navigate(['/estudiante/acceso']);
      localStorage.removeItem('alumno');
    }

    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }
}

