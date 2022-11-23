import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private URL = environment.URL + 'cursos';

  constructor(private http: HttpClient, private router: Router) { }

  createCourse(payload: any): any {
    return this.http.post<any>(this.URL, payload);
  }

  getCourses(): any {
    return this.http.get<any>(this.URL);
  }

  getCourse(id: string): any {
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  updateCourse(id: string, payload): any {
    return this.http.put<any>(`${this.URL}/${id}`, payload);
  }

  deleteCourse(id: string): any {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }


 
}
