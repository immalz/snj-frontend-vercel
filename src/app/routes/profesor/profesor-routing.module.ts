import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes
import { CursosComponent } from './pages/cursos/cursos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PagesComponent } from './pages/pages.component';
import { AulasComponent } from './pages/aulas/aulas.component';



// guards
import { AuthGuard } from './../../guards/auth.guard';
import { DocenteComponent } from './pages/docente/docente.component';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { NotaComponent } from './pages/nota/nota.component';
import { RevisionComponent } from './pages/revision/revision.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AsignacionAlumnoComponent } from './pages/asignacion-alumno/asignacion-alumno.component';
import { RegistroNotasComponent } from './pages/registro-notas/registro-notas.component';
import { MeritoComponent } from './pages/merito/merito.component';

const routes: Routes = [
  { path: 'docente',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'docentes', component: DocenteComponent},
      {path: 'alumnos', component: AlumnoComponent},
      {path: 'grados', component: AulasComponent},
      {path: 'asignacion-alumnos', component: AsignacionAlumnoComponent},
      {path: 'cursos', component: CursosComponent},
      {path: 'notas', component: NotaComponent},
      {path: 'registro-notas', component: RegistroNotasComponent},
      {path: 'merito', component: MeritoComponent},
      {path: 'revision', component: RevisionComponent},
      {path: 'perfil', component: PerfilComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorRoutingModule { }
