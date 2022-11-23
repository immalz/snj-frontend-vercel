import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CursosComponent } from './pages/Cursos/cursos.component';
import { PagesComponent } from './pages/pages.component';
import { NoticiasComponent } from './pages/Inicio/noticias.component';
import { CursoComponent } from './components/curso/curso.component';

// servicios y guards
import { AuthGuard } from './../../guards/auth.guard';

const routes: Routes = [
  { path: 'estudiante',
    canActivate: [AuthGuard],
    component: PagesComponent,
    children: [
      {path: '', component: NoticiasComponent},
      {path: 'cursos', component: CursosComponent},
      {path: 'perfil', component: PerfilComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }
