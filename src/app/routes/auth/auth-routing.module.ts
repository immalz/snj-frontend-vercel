import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginDocenteComponent } from './components/login-docente/login-docente.component';
import { LoginComponent } from './components/login/login.component';

// guards
import { AuthGuard } from './../../guards/auth.guard';

// servicios
import { TokenInterceptorService } from './services/token-interceptor.service';

const routes: Routes = [
  {path: 'estudiante/acceso', component: LoginComponent},
  {path: 'docente/acceso', component: LoginDocenteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class AuthRoutingModule { }
