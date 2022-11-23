import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  private URL = environment.URL + 'grado';

  constructor(private http: HttpClient, private router: Router) { }

  createGrade(payload: any): any {
    return this.http.post<any>(this.URL, payload);
  }

  getGrades(): any {
    return this.http.get<any>(this.URL);
  }

  getGrade(id: string): any {
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  updateGrade(id: string, payload): any {
    return this.http.put<any>(`${this.URL}/${id}`, payload);
  }

  deleteSGrade(id: string): any {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }


 
}
