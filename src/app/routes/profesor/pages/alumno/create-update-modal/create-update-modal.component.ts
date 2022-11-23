import { ProfesorService } from './../../../services/profesor.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { GradoService } from '../../../services/grado.service';
import { AlumnoService } from '../../../services/alumno.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-update-modal',
  templateUrl: './create-update-modal.component.html',
  styleUrls: ['./create-update-modal.component.scss']
})
export class CreateUpdateModalStudentComponent implements OnInit {

  form: UntypedFormGroup;
  grades = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private alumnoService: AlumnoService,
    private gradesService: GradoService,
    private dialogRef: MatDialogRef<CreateUpdateModalStudentComponent>
  ) { }

  ngOnInit(): void {
    this.getGrades();
    this.initForm();

    if(this.data.mode === 'Actualizar' ) {
      this.getData();
    }
  }

  getGrades(): void {
    this.gradesService.getGrades().subscribe(
      (res: any) => {
        this.grades = res;
      }
    )
  }

  initForm(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: [{value: '', disabled: true}, Validators.required],
      contraseña: ['', Validators.required],
      dni: ['', Validators.required],
      edad: ['', Validators.required],
      grado: ['', ],
      genero: ['', Validators.required],
      codEstudiante: ['', Validators.required],
      roles: [['alumno']],
    });
  }

  getYear(grade: any): void {
    return grade.año;
  }

  getData(): any {
    this.alumnoService.getStudent(this.data.id).subscribe(
      (res: any) => {

        this.form.patchValue({
          nombre: res.nombre,
          correo: res.correo,
          dni: res.dni,
          edad: res.edad,
          genero: res.genero,
          codEstudiante: res.codEstudiante
        });

        if(res.grado[0] !== undefined) {
          this.form.get('grado').setValue(res.grado[0]._id);
        } 

        this.form.get('contraseña').clearValidators();
        this.form.get('contraseña').updateValueAndValidity();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  setEmail(e): any {

    const beforeEmail = '@alumnosnj.edu.pe'
    const username = e.target.value.split(' ');

    if(username.length === 3) {
      this.form.get('correo').setValue(`${username[1].toLowerCase()}${username[0].toLowerCase()}${beforeEmail}`);
    } else if (username.length === 4) {
      this.form.get('correo').setValue(`${username[2].toLowerCase()}${username[0].toLowerCase()}${beforeEmail}`);
    } else if (username.length === 5) {
      this.form.get('correo').setValue(`${username[3].toLowerCase()}${username[0].toLowerCase()}${beforeEmail}`);
    }

  }

  titlecase(value: string): any {
    return value.trim().split(' ')
    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
  }



  save(): any {
    const payload = this.form.getRawValue();
    const grado = [];

    grado.push(this.form.get('grado').value);
    payload.grado = grado;
    payload.nombre = this.titlecase(payload.nombre);

    console.log(payload);

    if(this.data.mode === 'Actualizar') {
      delete payload.contraseña;
      this.alumnoService.updateStudent(this.data.id, payload).subscribe(
        (res: any) => {
          console.log(res);
          this.dialogRef.close();
        },
        (err: any) => {
          console.log(err)
        }
      )
    } else {
      this.alumnoService.createStudent(payload).subscribe(
        (res: any) => {
          console.log(res);
          this.dialogRef.close();
        },
        (err: any) => {
          console.log(err)
        }
      )
    }
  }

}
