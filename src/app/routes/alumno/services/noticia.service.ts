import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private URL = environment.URL + 'noticias';

  constructor(private http: HttpClient, private router: Router) { }

  obtenerNoticias(): any {
    return this.http.get(this.URL);
  }

  crearNoticia(noticia, foto): any {
    return this.http.post(this.URL, noticia);
  }

  eliminarrNoticia(id: string): any {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
