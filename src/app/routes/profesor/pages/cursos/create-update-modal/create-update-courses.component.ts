import { CursoService } from './../../../services/curso.service';
import { GradoService } from '../../../services/grado.service';
import { ProfesorService } from '../../../services/profesor.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { RolesService } from '../../../services/roles.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-update-courses',
  templateUrl: './create-update-courses.component.html',
  styleUrls: ['./create-update-courses.component.scss']
})
export class CreateUpdateCoursesComponent implements OnInit {

  form: UntypedFormGroup;
  teachers = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<CreateUpdateCoursesComponent>,
    private cursoService : CursoService,
    private docenteService: ProfesorService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getRoles();
    this.initForm();

    if(this.data.mode === 'Actualizar' ) {
      this.getData();
    }
  }

  getRoles(): void {
    this.docenteService.getTeachers().subscribe(
      res => {
        console.log(res);
        this.teachers = res;
      }
    )
  }

  initForm(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      nivel: ['', Validators.required],
      docente: ['', ],
    });
  }

  getData(): any {
    this.cursoService.getCourse(this.data.id).subscribe(
      res => {
        console.log(res);

        this.form.patchValue({
          nombre: res.nombre,
          nivel: res.nivel,
        });

        if(res.docente.length > 0) {
          this.form.get('docente').setValue(res.docente[0]._id);
        }
        console.log(this.form.value);
      },
      err => {
        console.log(err);
      }
    )
  }


  save(): any {
    const payload = this.form.value;

    console.log(payload);

    if(this.data.mode === 'Actualizar') {
      delete payload.contraseña;
      this.cursoService.updateCourse(this.data.id, payload).subscribe(
        res => {
          console.log(res);
          this.dialogRef.close();
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.cursoService.createCourse(payload).subscribe(
        res => {
          console.log(res);
          this.dialogRef.close();
        },
        err => {
          console.log(err);
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
