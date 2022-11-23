import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NoticiaService } from './../../services/noticia.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-nueva-noticia',
  templateUrl: './nueva-noticia.component.html',
  styleUrls: ['./nueva-noticia.component.scss']
})
export class NuevaNoticiaComponent implements OnInit {

  nuevaNoticia: UntypedFormGroup;
  noticias = [];
  file: File;
  photoSelected: string | ArrayBuffer;
  enlaces = false;
  imagen = false;

  constructor(
    private noticiaService: NoticiaService,
    private builder: UntypedFormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<NuevaNoticiaComponent>
  ) {
    this.nuevaNoticia = this.builder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      enlaces: [''],
      foto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  send(valueForm): any {
    this.noticiaService.crearNoticia(valueForm, this.file)
      .subscribe(
        res => {
          this.closeDialog();
          Swal.fire(
            'Felicidades!',
            `La noticia: ${valueForm.titulo} ha sido publicado!`,
            'success'
          );
        },
        err => {
          Swal.fire(
            'Lastima!',
            `La noticia: ${valueForm.titulo} no se ha podido publicar!`,
            'error'
          );
        }
      );
  }

  onMedicineSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = (event.target.files[0] as File);
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  closeDialog(): any{
    this.dialogRef.close();
  }
}
