import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
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

  crearNoticia(noticia, foto: File): any {

    const formData = new FormData();

    formData.append('titulo', noticia.titulo);
    formData.append('descripcion', noticia.descripcion);
    formData.append('enlaces', noticia.enlaces);
    formData.append('foto', foto);

    return this.http.post(this.URL, formData);
  }

  eliminarrNoticia(id: string): any {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
