import { DenegadoComponent } from './pages/denegado/denegado.component';
import { InicioComponent } from './pages/inicio/inicio.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: '404', component: DenegadoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
