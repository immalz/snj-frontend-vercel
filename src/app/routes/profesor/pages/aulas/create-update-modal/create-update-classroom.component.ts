import { GradoService } from './../../../services/grado.service';
import { ProfesorService } from './../../../services/profesor.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { RolesService } from '../../../services/roles.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-update-classroom',
  templateUrl: './create-update-classroom.component.html',
  styleUrls: ['./create-update-classroom.component.scss']
})
export class CreateUpdateClassroomComponent implements OnInit {

  form: UntypedFormGroup;
  teachers = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<CreateUpdateClassroomComponent>,
    private gradesService: GradoService,
    private rolesService: RolesService,
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
      piso: ['', Validators.required],
      numeroAula: ['', Validators.required],
      nivel: ['', Validators.required],
      tutor: ['', Validators.required],
    });
  }

  getData(): any {
    this.gradesService.getGrade(this.data.id).subscribe(
      res => {
        console.log(res);

        this.form.patchValue({
          nombre: res.nombre,
          piso: res.piso,
          numeroAula: res.numeroAula,
          nivel: res.nivel,
        });

        if(res.tutor.length > 0) {
          this.form.get('tutor').setValue(res.tutor[0]._id);
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
      this.gradesService.updateGrade(this.data.id, payload).subscribe(
        res => {
          console.log(res);
          this.dialogRef.close();
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.gradesService.createGrade(payload).subscribe(
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
