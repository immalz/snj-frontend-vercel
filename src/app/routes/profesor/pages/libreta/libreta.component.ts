
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GradoService } from '../../services/grado.service';
import { CursoService } from '../../services/curso.service';
import { NotaService } from '../../services/nota.service';
import { AlumnoService } from '../../services/alumno.service';
const _ = require('lodash');

@Component({
  selector: 'app-libreta',
  templateUrl: './libreta.component.html',
  styleUrls: ['./libreta.component.scss']
})
export class LibretaComponent implements OnInit{

  grades = [];
  alumnosList = [];
  courses = [];
  coursesList = [];
  courseName = 'Aritmética';
  gradeActive = '1er Grado';
  nivel = 'primaria'
  loading = false;
  loadingContent = false;
  orderBy = 'mayor';
  meses = [
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio', 'agosto', 'septiembre',
    'octubre', 'noviembre', 'diciembre'
  ]

  constructor(
    private notaService: NotaService,
    private gradoService: GradoService,
    private alumnoService: AlumnoService,
    private courseService: CursoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const payload = {
      aula: '636857538e2da63de43f351e',
      año: '2022',
    }
    this.loading = true;
    this.getGrados();
    this.getCourses(this.nivel);
    this.getNotes(payload);
  }


  getCourses(nivel): void {
    this.courseService.getCourses().subscribe(
      res => {
        this.courses = res.filter(element => element.nivel === nivel);
        this.coursesList = res.filter(element => element.nivel === nivel);
      }
    )
  }

  getGrados(): void {
    this.gradoService.getGrades().subscribe(
      res => {
        console.log(res);
        this.grades = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  showGrade(grade): void {
    this.loadingContent = true;
    const payload = {
      aula: grade._id,
      año: '2022'
    }
    this.getCourses(grade.nivel);
    this.gradeActive = grade.nombre;
    this.getNotes(payload);
  }

  selectCourse(course): void {
    this.courseName = course.nombre;
  }


  getNotes(payload): void {
    this.notaService.getNoteForGrade(payload).subscribe(
      res => {
        const alumnos = [];
        const grupos = {};

        res.forEach(notas => {
          const alumno = notas.alumno[0].nombre;

          if(!grupos[alumno]) grupos[alumno] = [];
          grupos[alumno].push(notas);
        });

        for (const key in grupos) {
          alumnos.push({
            nombre: key,
            cursos: _.groupBy(grupos[key], 'curso[0].nombre')
          })
        }

        this.obtaintNotes(alumnos);
      }
    );
  }

  getRandom(): any {
    return Math.floor(Math.random() * (21 - 12) + 12);
  }

  goToLibreta(alumno): void {
    console.log(alumno);
    this.router.navigate(['/docente/libretas', { queryParams: { alumno: alumno.nombre}}]);
    this.alumnoService.alumno = alumno;
  }

  getProm(item): any {
    const list = item.cursos[this.courseName];
    let result = list.reduce((sum, nota) => sum + Number(nota.nota), 0);
    const found = this.alumnosList.find(e => e === item);
    found.promedio = result / list.length;
    return result / list.length;
  }

  order(orderby): void {
    console.log(orderby)
    if(orderby === 'mayor') {
      this.alumnosList = this.alumnosList.sort(function(a, b){return b.promedio - a.promedio});
      this.orderBy = 'menor';
    } else {
      this.alumnosList = this.alumnosList.sort(function(a, b){return a.promedio - b.promedio});
      this.orderBy = 'mayor';
    }

    
    
  }

  obtaintNotes(alumnos): any {
    for (const alumno of alumnos) {
      for (const curso in alumno.cursos) {

        alumno.cursos[curso] = this.returnFormat(alumno.cursos[curso]);

        alumno.promedio = 0;

        console.log(alumno)

      }
    }

    this.alumnosList = alumnos;
    this.loading = false;
    this.loadingContent = false;
  }

  returnFormat(curso) {
    
    const newCurso = curso.map(nota => {
          return {
            nota: nota.nota,
            mes: nota.mes
          }
        });
    return newCurso;
  }


}