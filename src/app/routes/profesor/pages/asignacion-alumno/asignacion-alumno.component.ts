import { GradoService } from './../../services/grado.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {MatSort} from '@angular/material/sort';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import { formatDate } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnoService } from '../../services/alumno.service';
import { ActivatedRoute } from '@angular/router';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-asignacion-alumno',
  templateUrl: './asignacion-alumno.component.html',
  styleUrls: ['./asignacion-alumno.component.scss']
})
export class AsignacionAlumnoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','age', 'grade', 'actions'];
  dataSource!: any
  dataSourceCourse: MatTableDataSource<any>;
  dataStorage: any = [];
  LastRegister: number = null;
  routeParamsID: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator2: MatPaginator;
  @ViewChild(MatSort) sort2: MatSort;

  constructor(
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private aulaService: GradoService
  ) {
  }

  ngOnInit(): void {
    this.getActiveRoute();
  }
  
  ngAfterViewInit() {
    this.getTeachers();
  }

  getTeachers(): void {
    this.alumnoService.getStudents().subscribe(
      res => {
        console.log(res);
        this.dataStorage = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator2;
        this.dataSource.sort = this.sort2;
 
        this.getLastRegister();

        this.dataSourceCourse = res.filter(element => element.grado[0]._id === this.routeParamsID);
               
        this.dataSourceCourse.paginator = this.paginator2;
        this.dataSourceCourse.sort = this.sort2;

      }
    )
  }


  getActiveRoute(): void {
    this.activeRoute.queryParamMap
      .subscribe((params) => {
        const paramss = { ...params.keys, ...params };
        
        this.routeParamsID = paramss['params'].aula;

        this.getGrade(paramss['params'].aula);
      }
    );
  }

  getGrade(id: string): any {
    this.aulaService.getGrade(id).subscribe(
      res => {
        console.log(res);
        // this.dataSourceCourse = new MatTableDataSource(res.alumnos);
      }
    )
  }


  assignCourses(id: string): void {
    console.log(id);
  }

  deleteStudent(id: string): void {
    console.log(id);
  }

  getLastRegister(): any {

    const found = this.dataStorage.filter(e => formatDate(e.createdAt, 'dd-MM-yyyy','en-US') === formatDate(new Date() , 'dd-MM-yyyy','en-US'))
    this.LastRegister = found.length;
  }

  getTeacherAssign(): any {
    const founds = this.dataStorage.filter(element => element.grado.length === 0);

    return founds.length;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
