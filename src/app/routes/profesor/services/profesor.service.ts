import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private URL = environment.URL + 'auth';
  private URLdocente = environment.URL + 'docente';

  constructor(private http: HttpClient, private router: Router) { }

  getTeachers(): any {
    return this.http.get<any>(this.URLdocente);
  }

  saveTeacher(payload: any): any {
    return this.http.post<any>(this.URL + '/docente/signup', payload);
  }

  getTeacher(id: string): any {
    return this.http.get(`${this.URLdocente}/${id}`);
  }

  actualizarDocente(id: string, docente): any {
    return this.http.put(`${this.URLdocente}/${id}`, docente);
  }

  eliminarDocente(id: string): any {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
