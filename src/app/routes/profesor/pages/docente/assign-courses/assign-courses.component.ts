import { CursoService } from './../../../services/curso.service';
import { ProfesorService } from './../../../services/profesor.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-assign-courses',
  templateUrl: './assign-courses.component.html',
  styleUrls: ['./assign-courses.component.scss']
})
export class AssignCoursesComponent implements OnInit {

  form: UntypedFormGroup;
  roles = [];
  courses = [];
  allComplete: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AssignCoursesComponent>,
    private docenteService: ProfesorService,
    private rolesService: RolesService,
    private courseService: CursoService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getRoles();
    this.initForm();
    this.getCourses();

    if(this.data.mode === 'Actualizar' ) {
      this.getData();
    }
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(
      res => {
        console.log(res);
        for (const course of res) {
          course.checked = false;
        }
        this.courses =  res;
      }
    );
  }

  getRoles(): void {
    this.rolesService.getRoles().subscribe(
      res => {
        console.log(res);
        this.roles = res;
      }
    );
  }

  initForm(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: [{value: '', disabled: true}, Validators.required],
      contraseña: ['', Validators.required],
      dni: ['', Validators.required],
      celular: ['', Validators.required],
    });
  }

 updateAllComplete(): void {
    this.allComplete = this.courses != null && this.courses.every(t => t.checked);
  }

  someComplete(): boolean {
    if (this.courses == null) {
      return false;
    }
    return this.courses.filter(t => t.checked).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean): any {
    this.allComplete = completed;
    if (this.courses == null) {
      return;
    }
    this.courses.forEach(t => t.checked = completed);
  }

  getData(): any {
    this.docenteService.getTeacher(this.data.id).subscribe(
      res => {
        console.log(res);

        this.form.patchValue({
          nombre: res.nombre,
          correo: res.correo,
          dni: res.dni,
          celular: res.celular,
          cargo: res.roles[0]._id,
        });
        console.log(this.form.value);

        this.form.get('contraseña').clearValidators();
        this.form.get('contraseña').updateValueAndValidity();
      },
      err => {
        console.log(err);
      }
    )
  }

  setEmail(e): any {

    const beforeEmail = '@snj.edu.pe'
    const username = e.target.value.split(' ');

    if(username.length === 3) {
      this.form.get('correo').setValue(`${username[1].toLowerCase()}${username[0].toLowerCase()}${beforeEmail}`);
    } else if (username.length === 4) {
      this.form.get('correo').setValue(`${username[2].toLowerCase()}${username[0].toLowerCase()}${beforeEmail}`);
    }

  }

  titlecase(value: string): any {
    return value.split(' ')
    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
  }


  save(): any {
    const payload = this.form.getRawValue();

    payload.roles = ['docente'];
    payload.nombre = this.titlecase(payload.nombre);
    console.log(payload);

    if(this.data.mode === 'Actualizar') {
      delete payload.contraseña;
      this.docenteService.actualizarDocente(this.data.id, payload).subscribe(
        res => {
          console.log(res);
          this.dialogRef.close();
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this.docenteService.saveTeacher(payload).subscribe(
        res => {
          console.log(res);
          this.dialogRef.close();
        },
        err => {
          console.log(err)
        }
      )
    }

    // this.docenteService.saveTeacher(payload).subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // )
  }

}
