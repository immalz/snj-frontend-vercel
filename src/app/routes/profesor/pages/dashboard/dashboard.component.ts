import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { CursoService } from '../../services/curso.service';
import { GradoService } from '../../services/grado.service';
import { NotaService } from '../../services/nota.service';
import { ProfesorService } from '../../services/profesor.service';
import { AulasComponent } from '../aulas/aulas.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  alumnList: any;
  teacherList: any;
  noteList: any;
  aulaList: any;
  coursesList: any;
  observerList: any;
  observationMonth: any;

  loadingAlumn: boolean = false; 
  loadingTeacher: boolean = false; 
  loadingNote: boolean = false; 
  loadingAula: boolean = false; 
  loadingCourse: boolean = false; 
  loadingObserver: boolean = false; 

  selectYear: string = '2022';

  constructor(
    private alumnoService: AlumnoService,
    private docenteService: ProfesorService,
    private notaService: NotaService,
    private aulaService: GradoService,
    private cursoService: CursoService,

  ) { }

  ngOnInit(): void {
    this.loadingAlumn = false;
    this.loadingTeacher = false;
    this.loadingNote = false;
    this.loadingAula = false;
    this.loadingCourse = false;
    this.getAlumns();
    this.getTeachers();
    this.getNotes();
    this.getClasses();
    this.getCourses();
  }

  getAlumns(): void {
    this.alumnoService.getStudents().subscribe(
      res => {
        this.alumnList = res;
        this.loadingAlumn = true;
      }
    )
  }

  getTeachers(): void {
    this.docenteService.getTeachers().subscribe(
      res => {
        this.teacherList = res;
        this.loadingTeacher = true;
      }
    )
  }

  getNotes(): void {
    this.notaService.getNotes().subscribe(
      res => {
        this.noteList = res;
        this.loadingNote = true;
      }
    )
  }
  


  getClasses(): void {
    this.aulaService.getGrades().subscribe(
      res => {
        this.aulaList = res;
        this.loadingAula = true;
      }
    )
  }

  getCourses(): void {
    this.cursoService.getCourses().subscribe(
      res => {
        this.coursesList = res;
        this.loadingCourse = true;
        this.getObservation(res);
      }
    )
  }

  getObservation(values: any): void {
    const arrayID = values.map(element => {
      return element._id
    });

    this.notaService.getNoteObserver(arrayID).subscribe(
      res => {
        this.observerList = res;
        this.loadingObserver = true;

        this.observationMonth = res.filter(element => element.mes.toLowerCase() === 'noviembre')
      }
    )
  }


  change(): void {
    console.log(this.selectYear)
  }
}
