import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss']
})
export class NuevoAlumnoComponent implements OnInit {

  nuevoAlumno: UntypedFormGroup;

  file: File;
  photoSelected: string | ArrayBuffer;

  constructor(
    private builder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<NuevoAlumnoComponent>
    ) {
      this.nuevoAlumno = this.builder.group({
        nombre: ['', Validators.required],
        correo: ['', Validators.compose([Validators.required, Validators.email])],
        contraseña: ['', Validators.required],
        edad: ['', Validators.required],
        grado: ['', Validators.required],
        direccion: ['', Validators.required],
        roles: [['alumno']]
      });
    }

  ngOnInit(): void {
  }

  send(valueForm): any {
    console.log(valueForm);
    console.log(this.file);
    this.authService.signUp(valueForm, this.file)
    .subscribe(
      res => {
        this.closeDialog();
        Swal.fire(
          'Felicidades!',
          `El alumno ${valueForm.nombre} se ha registrado satisfactoriamente!`,
          'success'
        );
      },
      err => {
        Swal.fire(
          'Lastima!',
          `El alumno ${valueForm.nombre} no se ha podido registrar!`,
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
