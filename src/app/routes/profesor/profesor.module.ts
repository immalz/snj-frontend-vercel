import { AssignCoursesComponent } from './pages/docente/assign-courses/assign-courses.component';
import { CreateUpdateCoursesComponent } from './pages/cursos/create-update-modal/create-update-courses.component';
import { CreateUpdateClassroomComponent } from './pages/aulas/create-update-modal/create-update-classroom.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modulos
import {ProfesorRoutingModule} from './profesor-routing.module';
import { MaterialModule } from './../../material/material.module';

// componentes
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AulasComponent } from './pages/aulas/aulas.component';
import { AulaComponent } from './components/aula/aula.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagesComponent } from './pages/pages.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DocenteComponent } from './pages/docente/docente.component';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { RegistroNotasComponent } from './pages/registro-notas/registro-notas.component';
import { NotaComponent } from './pages/nota/nota.component';
import { RevisionComponent } from './pages/revision/revision.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateUpdateModalComponent } from './pages/docente/create-update-modal/create-update-modal.component';
import { CreateUpdateModalStudentComponent } from './pages/alumno/create-update-modal/create-update-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsignacionAlumnoComponent } from './pages/asignacion-alumno/asignacion-alumno.component';
import { TestingComponent } from './pages/testing/testing.component';
import { MeritoComponent } from './pages/merito/merito.component';
import { UpdateNoteComponent } from './pages/revision/update-note/update-note.component';
import { LibretaComponent } from './pages/libreta/libreta.component';
import { LibretasComponent } from './pages/libretas/libretas.component';


@NgModule({
  declarations: [PerfilComponent, AulasComponent, AulaComponent, NavbarComponent, PagesComponent, CursosComponent, SidebarComponent, DocenteComponent, AlumnoComponent, RegistroNotasComponent, NotaComponent, RevisionComponent, DashboardComponent, CreateUpdateModalComponent, CreateUpdateModalStudentComponent, CreateUpdateClassroomComponent, CreateUpdateCoursesComponent, AsignacionAlumnoComponent, AssignCoursesComponent, TestingComponent, MeritoComponent, UpdateNoteComponent, LibretaComponent, LibretasComponent],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfesorModule { }
