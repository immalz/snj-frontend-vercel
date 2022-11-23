import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private URL = environment.URL + 'alumno';
  private URLAUTH = environment.URL + 'auth';

  constructor(private http: HttpClient, private router: Router) { }

  createStudent(payload: any): any {
    return this.http.post<any>(this.URLAUTH + '/signup', payload);
  }

  getStudents(): any {
    return this.http.get<any>(this.URL);
  }

  getStudent(id: string): any {
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  updateStudent(id: string, payload): any {
    return this.http.put<any>(`${this.URL}/${id}`, payload);
  }

  deleteStudent(id: string): any {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }


 
}
