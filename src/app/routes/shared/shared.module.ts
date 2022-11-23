import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Servicios

import { ScriptsService } from './services/scripts.service';

// modulos
import { SharedRoutingModule } from './shared-routing.module';
import { ProfesorModule } from './../profesor/profesor.module';
import { AlumnoModule } from './../alumno/alumno.module';

// enrutador
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DenegadoComponent } from './pages/denegado/denegado.component';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, LoadingComponent, InicioComponent, DenegadoComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    // AlumnoModule,
    // ProfesorModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent
  ],
  providers: [
    ScriptsService
  ]
})
export class SharedModule { }
