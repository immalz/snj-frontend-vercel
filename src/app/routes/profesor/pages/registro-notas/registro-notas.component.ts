import { NotaService } from './../../services/nota.service';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { CursoService } from './../../services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GradoService } from './../../services/grado.service';
import { AlumnoService } from './../../services/alumno.service';
import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-registro-notas',
  templateUrl: './registro-notas.component.html',
  styleUrls: ['./registro-notas.component.scss'],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { 
     provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
   ]
})
export class RegistroNotasComponent implements OnInit {

  studentList = [];
  activeGrade: string = '';
  activeCourse: string = '';
  grade: any;
  course: any;
  headers = ['N°', 'Nombre', '1er Trimestre', '2do Trimestre', '3er Trimestre'];
  loading: boolean = false;
  // monthList = ['Marzo', 'Abril', 'Mayo', 'Junio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  monthList = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
  }
  date = new FormControl(moment());

  anio: any;
  mes: any;
  form: FormGroup;
  foundNotes: boolean;

  constructor(
    private studentService: AlumnoService,
    private gradoService: GradoService,
    private activeRoute: ActivatedRoute,
    private courseService: CursoService,
    private fb: FormBuilder,
    private notaService: NotaService,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit(): void {
    this.getActiveRoute();
    this.getStudent();
  };

  transformDate(date) {
    return formatDate(date, 'yyyy-MM', this.locale);
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  getGrade(id: string): void {
    this.gradoService.getGrade(id).subscribe(
      res => {
        console.log(res);
        this.grade = res;
        this.getCourse(this.activeCourse);
      }
    )
  }

  getCourse(id: string): void {
    this.courseService.getCourse(id).subscribe(
      res => {
        this.course = res;
        // this.course = res.filter(element => element._id === this.activeCourse)[0];
        console.log(res);
        this.searchNotes();
      }
    );
  }

  searchNotes(): void {

    const payload = {
      curso: this.activeCourse,
      aula: this.activeGrade,
      año:'',
      mes: ''
    }

    const date = this.transformDate(this.date.value['_d']).split('-');

    payload.mes = this.monthList[Number(date[1])]
    payload.año = date[0];

    this.mes = this.monthList[Number(date[1])];
    this.anio = date[0];

    // console.log(payload);

    this.notaService.getNoteForCourse(payload).subscribe(
      res => {
        this.loading = true;
        this.foundNotes = res.length > 0 ? true : false;
        this.setNotes(res);
        // console.log(res);

      }
    );
  }

  setNotes(notes): void {
    for (const student of this.studentList) {
      student.nota = null;
      const found = notes.find(element => student.alumno === element.alumno[0]._id);
      student['nota'] = found ? found.nota : null;
      student['noteID'] = found ? found._id : null;
      student['observacion'] = found ? found.observacion : false;
      console.log(found)
    }

    console.log(notes);

    // console.log(this.studentList);
  }


  save(): void {

    const payload = this.studentList.map(element => {
      return {
        curso: element.curso,
        grado: element.grado,
        alumno: element.alumno,
        año: this.anio,
        mes: this.mes,
        nota: element.nota !== null ? element.nota : 0,
        observacion: element.observacion,
        aprobacion: false
      }
    });

    console.log(payload);

    Swal.fire({
      title: '¿Quieres guardar los cambios?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.notaService.createNote(payload).subscribe(
          res => {
            console.log(res);
            Swal.fire(`El registro del mes de ${this.mes} - ${this.anio} ha sido registrado!`, '', 'success');
            this.searchNotes();
          },
          err => {
            Swal.fire('Los cambios no se guardaron', '', 'info')
          }
        )
        
      } else if (result.isDenied) {
        
      }
    })

    
  }

  update(): void {
    
  }

  getRange(nota): any {
    if(nota > 0 && nota <= 11) {
      return 'C'
    }

    if(nota > 11 && nota <= 14) {
      return 'B'
    }

    if(nota > 14 && nota <= 17) {
      return 'A'
    }

    if(nota >= 17 && nota <= 20) {
      return 'AD'
    }
  }

  getStudent(): void {
    this.studentService.getStudents().subscribe(
      res => {
        this.studentList = res
          .filter(e => e.grado[0]._id === this.activeGrade)
          .map(element => {
            return {
              alumno: element._id,
              nombre: element.nombre,
              grado: this.activeGrade,
              año: '',
              mes: '',
              curso: this.activeCourse,
              observacion: false,
              nota: null
            }
          })
        console.log(this.studentList);
      }
    )
  }

  goToRanking(): void {
    this.router.navigate([`/docente/merito`], { queryParams: { aula: this.activeGrade, curso: this.activeCourse}});
  }

  setObservation(item: any): void {
    const payload = {
      observacion: true
    }

    console.log(payload, item.alumno)

    this.notaService.generateReview(item.noteID, payload).subscribe(
      res => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Se ha emitido la observación',
          showConfirmButton: false,
          timer: 1500
        })
        this.searchNotes();
      },
      err => {
        console.log(err)
      }
    )
  }

  getActiveRoute(): void {
    this.activeRoute.queryParamMap
      .subscribe((params) => {
        const paramss = { ...params.keys, ...params };
        
        // this.routeParamsID = paramss['params'].aula;
        this.activeGrade = paramss['params'].aula;
        this.activeCourse = paramss['params'].curso;
        console.log(this.activeCourse)
        this.getGrade(this.activeGrade);
      }
    );
  }


}
