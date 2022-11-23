import { ProfesoresComponent } from './pages/profesores/profesores.component';
import { PagesComponent } from './pages/pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes
import { AlumnoComponent } from './components/alumno/alumno.component';
import { NuevoAlumnoComponent } from './pages/nuevo-alumno/nuevo-alumno.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';


// guards
import { AdminGuard } from '../../guards/admin.guard';
import { NoticiasComponent } from './pages/noticias/noticias.component';

const routes: Routes = [
  {
      path: 'administrar',
      canActivate: [AdminGuard],
      component: PagesComponent,
      children: [
        {path: '', component: AdministradorComponent},
        {path: 'alumnos', component: AlumnosComponent},
        {path: 'alumno/:id', component: AlumnoComponent},
        {path: 'profesores', component: ProfesoresComponent},
        {path: 'noticias', component: NoticiasComponent},
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
