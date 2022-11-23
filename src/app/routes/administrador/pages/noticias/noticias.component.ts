import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { NuevaNoticiaComponent } from './../../components/nueva-noticia/nueva-noticia.component';
import { NoticiaService } from './../../services/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  noticias = [];

  imgPath = environment.IMAGEN;

  constructor(
    private noticiaService: NoticiaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerNoticias();
  }

  obtenerNoticias(): any {
    this.noticiaService.obtenerNoticias()
      .subscribe(
        res => {
          console.log(res);
          this.noticias = res;
        },
        err => { console.log(err); }
      );
  }

  agregarNoticia(): any {
    this.dialog.open(NuevaNoticiaComponent, { panelClass: 'custom-modalbox' });
  }
}
