import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioAlumnos: UntypedFormGroup;
  hide = true;

  constructor(private builder: UntypedFormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.formularioAlumnos = this.builder.group({
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contraseña: ['', Validators.required]
    });
  }


  Acceder(): any {
    this.authService.signIn(this.formularioAlumnos.value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.studentFound.roles[0].nombre);
        localStorage.setItem('alumno', JSON.stringify(res.studentFound));

        this.router.navigate(['/estudiante']);
      },
      err => {
        console.log(err);
        Swal.fire(
          'Plataforma Virtual',
          `${err.error.message}`,
          'error'
        );
      }
    );
  }

}
