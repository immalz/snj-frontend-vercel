import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private URL = environment.URL + 'notas';

  constructor(private http: HttpClient, private router: Router) { }

  getNotes(): any {
    return this.http.get<any>(this.URL);
  }

  getNoteForCourse(payload: any): any {
    return this.http.post<any>(`${this.URL}/curso`, payload);
  }

  getNoteObserver(payload: any): any {
    return this.http.post<any>(`${this.URL}/observadas`, payload);
  }

  generateReview(id, payload): any{
    return this.http.post<any>(`${this.URL}/revision/${id}`, payload);
  }

  acceptReview(id, payload): any{
    return this.http.post<any>(`${this.URL}/confirmar-revision/${id}`, payload);
  }

  createNote(payload: any): any {
    return this.http.post<any>(this.URL + '/', payload);
  }

  updateNote(id: string, payload): any {
    return this.http.post<any>(`${this.URL}/actualizar/${id}`, payload);
  }

  deleteNote(id: string): any {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }
}
