import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CursoService } from './../../services/curso.service';
import { formatDate } from '@angular/common';
import { GradoService } from './../../services/grado.service';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CreateUpdateCoursesComponent } from './create-update-modal/create-update-courses.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements  OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'nivel', 'tutor', 'creacion', 'actions'];

  dataSource: any
  dataStorage: any = [];
  listavacia: any[] = [];
  LastRegister: number = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cursosService: CursoService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): any {
    this.getTeachers();
  }

  getTeachers(): void {
    this.cursosService.getCourses().subscribe(
      res => {
        console.log(res);
        this.dataStorage = res;
        this.listavacia = res;
        this.dataSource = new MatTableDataSource<any>(this.listavacia);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getLastRegister();
      }
    )
  }

  createUpdateCourse(id: string, mode: string): void {
    const dialogRef = this.dialog.open(CreateUpdateCoursesComponent, {
      data: {
        id,
        mode
      },
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTeachers();
    });
  }

  assignCourses(id: string): void {
    console.log(id);
  }

  deleteStudent(id: string): void {
    console.log(id);
  }

  getLastRegister(): any {
    const found = this.dataStorage.filter(e => formatDate(e.createdAt, 'dd-MM-yyyy', 'en-US') === formatDate(new Date() , 'dd-MM-yyyy', 'en-US'));
    this.LastRegister = found.length;
  }

  getStudentsInClass(): any {
    const founds = this.dataStorage.filter(element => element.alumnos.length === 0);

    return founds.length;
  }

  deleteTeacher(id): any {
    
  }

  getTeacherAssign(): any {
    const count = this.dataStorage.filter(element => element.docente.length === 0);

    return count.length;
  }

  getYear(date): any {
    return new Date(date).getFullYear();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

