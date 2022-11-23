import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSort } from '@angular/material/sort';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';

import { NuevoAlumnoComponent } from './../nuevo-alumno/nuevo-alumno.component';
import { AlumnoService } from './../../services/alumno.service';

import Swal from 'sweetalert2';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements AfterViewInit {

  ELEMENT_DATA = [];

  displayedColumns: string[] = ['nombre', 'correo', 'direccion', 'edad', 'grado', 'tools'];

  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private alumnoService: AlumnoService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.getAlumnos();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAlumnos(): any {
    this.alumnoService.obtenerAlumnos()
      .subscribe(
        (res: any) => {
          console.log(res);
          this.dataSource.data = res;
        },
        err => console.log(err)
      );
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  agregarAlumno(): any {
    this.dialog.open(NuevoAlumnoComponent, { panelClass: 'custom-modalbox' });
  }

  editarAlumno(id: string): any {
    console.log(id);
  }

  eliminarAlumno(id: string, nombre: string): any {
    console.log(id);
    Swal.fire({
      title: `¿Seguro que deseas eliminar a: ${nombre}?`,
      text: 'La eliminació es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.alumnoService.eliminarAlumno(id)
          .subscribe(
            res => {
              this.ngAfterViewInit();
              this.dialog.closeAll();
            },
            err => { console.log(err); }
          );
      }
    },
      err => {
        console.log(err);
      }
    );
  }


}
