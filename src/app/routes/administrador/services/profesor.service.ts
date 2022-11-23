import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private URL = environment.URL + 'docente';

  constructor(private http: HttpClient, private router: Router) { }

  obtenerDocentes(): any {
    return this.http.get(this.URL);
  }

  obtenerDocente(id: string): any {
    return this.http.get(`${this.URL}/${id}`);
  }

  actualizarDocente(id: string, docente): any {
    return this.http.put(`${this.URL}/${id}`, docente);
  }

  eliminarDocente(id: string): any {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
