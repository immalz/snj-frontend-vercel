import { MaterialModule } from './../../material/material.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { LoginComponent } from './components/login/login.component';
import { LoginDocenteComponent } from './components/login-docente/login-docente.component';

// servicios
import { TokenInterceptorService } from './services/token-interceptor.service';

// guards
import { AuthGuard } from './../../guards/auth.guard';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [LoginComponent, LoginDocenteComponent, ButtonComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class AuthModule { }
