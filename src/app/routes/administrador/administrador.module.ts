import { TokenInterceptorService } from './../auth/services/token-interceptor.service';
import { AuthGuard } from './../../guards/auth.guard';
import { MaterialModule } from './../../material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { NuevoAlumnoComponent } from './pages/nuevo-alumno/nuevo-alumno.component';

// modulos
import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { PagesComponent } from './pages/pages.component';
import { ProfesoresComponent } from './pages/profesores/profesores.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NuevaNoticiaComponent } from './components/nueva-noticia/nueva-noticia.component';
import { LimitPipe } from './pipe/limit.pipe';

@NgModule({
  declarations: [
    SidebarComponent,
    AlumnoComponent,
    AlumnosComponent,
    NuevoAlumnoComponent,
    AdministradorComponent,
    PagesComponent,
    ProfesoresComponent,
    NoticiasComponent,
    NuevaNoticiaComponent,
    LimitPipe],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [],
})
export class AdministradorModule { }
