import { AuthService } from './../../../auth/services/auth.service';
import { AlumnoService } from './../../services/alumno.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  imgPath = environment.IMAGEN;

  anio;

  constructor(public alumnoService: AlumnoService, public authService: AuthService) { }

  ngOnInit(): void {
    const hoy = new Date();
    this.anio = hoy.getFullYear();
  }

}
