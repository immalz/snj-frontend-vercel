import { AlumnoService } from './../services/alumno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.alumnoService.estudiante = JSON.parse(localStorage.getItem('alumno'));
    console.log(this.alumnoService.estudiante);
  }

}
