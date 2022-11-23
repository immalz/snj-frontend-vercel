import { CursoService } from './../../services/curso.service';
import { Router } from '@angular/router';
import { GradoService } from './../../services/grado.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss']
})
export class NotaComponent implements OnInit {

  gradeList = [];
  mode: string = 'aulas';
  aula: any;
  loading: boolean = false;
  classID: string = '';
  courseList: any = [];
  docente: any;
  courseConfig = {
    1: ['matematica', 'Matemática'],
    2: ['matematica', 'Razonamiento Matemático'],
    3: ['matematica', 'Álgebra'],
    4: ['matematica', 'Geometría'],
    5: ['matematica', 'Aritmética'],
    6: ['comunicacion', 'Razonamiento Verbal'],
    7: ['comunicacion', 'Gramática'],
    8: ['comunicacion', 'Literatura'],
    9: ['comunicacion', 'Plan Lector'],
    10: ['ciencia', 'Ciencias Naturales'],
    11: ['ciencia', 'Biología'],
    12: ['historia', 'Geografía'],
    13: ['historia', 'Historia del Perú'],
    15: ['historia', 'Educación Cívica'],
    16: ['religion', 'Educación Religiosa'],
    17: ['arte', 'Arte'],
    18: ['psico', 'Tutoría'],
    19: ['computacion', 'Computación'],
    20: ['ingles', 'Inglés'],
    21: ['danza', 'Danza'],
    22: ['historia', 'Personal Social'],
    23: ['ciencia', 'Ciencia y Ambiente'],
    24: ['religion', 'Religión'],
    25: ['psico', 'Psicomotricidad'],
    26: ['otros', ''],
    27: ['otros', ''],
    28: ['otros', ''],
    29: ['otros', ''],
  }

  constructor(
    private gradeService: GradoService,
    private router: Router,
    private courseService: CursoService
  ) { }

  ngOnInit(): void {
    this.docente = JSON.parse(localStorage.getItem('docente'));
    this.getGrades();

  }

  getGrades(): void {
    this.gradeService.getGrades().subscribe(
      res => {
        this.gradeList = res;
      }
    )
  }

  selectGrade(aula): void {
    this.courseList = [];
    this.loading = true;
    console.log(aula);
    this.aula = aula;
    this.classID = aula._id;
    this.mode = 'aula';
    this.courseService.getCourses().subscribe(
      res => {
        const courseGrade = res.filter(element => element.nivel === aula.nivel);

        for (const item of courseGrade) {
          if(item.docente.length === 0) {
            return;
          }

          if(item.docente[0].nombre === this.docente.nombre) {
            this.courseList.push(item);
          }
        }

        console.log(this.courseList);
      }
    )
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  return(): void {
    this.loading = true;

    setTimeout(() => {
      this.mode = 'aulas';
      this.loading = false;

    }, 1000);
  }



  getColorClass(name: string) {
    for (const key in this.courseConfig) {
      if(this.courseConfig[key][1] === name) {
        console.log(this.courseConfig[key][0])
        return this.courseConfig[key][0];
      }
    }
    return 'matematica'
  }

  goToAssignRatings(course: any): void {
    this.router.navigate([`/docente/registro-notas`], { queryParams: { aula: this.classID, curso: course._id}});
  }

}
