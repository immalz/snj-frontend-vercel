import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { formatDate } from '@angular/common';
import { AlumnoService } from '../../services/alumno.service';
import { CreateUpdateModalStudentComponent } from './create-update-modal/create-update-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email','dni','age', 'grade', 'genero', 'cod','create', 'actions'];
  dataSource!: any
  dataStorage: any = [];
  listavacia: any = [];
  LastRegister: number = 0;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private alumnoService: AlumnoService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.getTeachers();
  }

  getTeachers(): void {
    this.alumnoService.getStudents().subscribe(
      (res: any) => {
        this.listavacia = res;
        this.dataStorage = res;
        this.dataSource = new MatTableDataSource<any>(this.listavacia);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getLastRegister();
      }
    )
  }

  getCountString(cod: string): any {
    const value = [...cod + ''].length;
    return value === 8 ? true : false;
  }

  createUpdateStudent(id: string, mode: string): void {
    const dialogRef = this.dialog.open(CreateUpdateModalStudentComponent, {
      data: {
        id,
        mode
      },
      width: '600px'
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

    const found = this.dataStorage.filter((e: any) => formatDate(e.createdAt, 'dd-MM-yyyy','en-US') === formatDate(new Date() , 'dd-MM-yyyy','en-US'))
    this.LastRegister = found.length;
  }

  getTeacherAssign(): any {
    const founds = this.dataStorage.filter((element: any) => element.grado.length === 0);

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
