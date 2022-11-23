import { MaterialModule } from './../../material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AlumnoRoutingModule} from './alumno-routing.module';

import { NoticiasComponent } from './pages/Inicio/noticias.component';
import { CursosComponent } from './pages/Cursos/cursos.component';

import { TokenInterceptorService } from './../auth/services/token-interceptor.service';

import { AuthGuard } from './../../guards/auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagesComponent } from './pages/pages.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CursoComponent } from './components/curso/curso.component';

@NgModule({
  declarations: [CursosComponent, NoticiasComponent, SidebarComponent, NavbarComponent, PagesComponent, PerfilComponent, CursoComponent],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    MaterialModule
  ],
  exports: [],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class AlumnoModule { }
