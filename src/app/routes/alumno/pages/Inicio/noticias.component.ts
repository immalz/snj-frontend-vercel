import { Component, OnInit } from '@angular/core';

import { Alumno } from 'src/app/interfaces/alumno';
import { NoticiaService } from './../../services/noticia.service';
import { AuthService } from './../../../auth/services/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  alumno;
  noticias = [];
  like = false;
  imgPath = environment.IMAGEN;
  constructor(
    public authService: AuthService,
    private noticiaService: NoticiaService,
    ) {}

  ngOnInit(): void {
    this.authService.studentFound = JSON.parse(localStorage.getItem('alumno'));
    this.obtenerNoticias();
  }

  obtenerNoticias(): any {
    this.noticiaService.obtenerNoticias()
      .subscribe(
        res => {
          this.noticias = res.reverse();
        },
        err => { console.log(err); }
      );
  }

}
