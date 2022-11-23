import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-docente',
  templateUrl: './login-docente.component.html',
  styleUrls: ['./login-docente.component.scss']
})
export class LoginDocenteComponent implements OnInit {

  formularioProfesores: UntypedFormGroup;
  hide = true;

  constructor(private builder: UntypedFormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.formularioProfesores = this.builder.group({
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contraseña: ['', Validators.required]
    });
  }


  Acceder(): any {
    this.authService.signInDocente(this.formularioProfesores.value)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('rol', res.profesorEncontrado.roles[0].nombre);
          localStorage.setItem('docente', JSON.stringify(res.profesorEncontrado));


          if(res.profesorEncontrado.roles[0].nombre === 'docente') {
            this.router.navigate(['/docente/notas']);
          } else {
            this.router.navigate(['/docente/docentes']);
          }
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
