import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GradoService } from '../../services/grado.service';
import { CreateUpdateClassroomComponent } from './create-update-modal/create-update-classroom.component';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.scss']
})
export class AulasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'tutor', 'nivel', 'piso', 'numeroAula', 'año', 'actions'];
  dataSource!: any
  dataStorage: any = [];
  LastRegister: number = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private gradesService: GradoService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): any {
    this.getTeachers();
  }

  getTeachers(): void {
    this.gradesService.getGrades().subscribe(
      res => {
        console.log(res);
        this.dataStorage = res;
        this.dataSource = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getLastRegister();
      }
    )
  }

  createUpdateStudent(id: string, mode: string): void {
    const dialogRef = this.dialog.open(CreateUpdateClassroomComponent, {
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

  assignStudents(id: string): void {
    console.log(id);
    this.router.navigate(['/docente/asignacion-alumnos/'], { queryParams: { aula: id}})
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

