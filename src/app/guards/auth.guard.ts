import { AuthService } from './../routes/auth/services/auth.service';

import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(): any{
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/404']);
    }
  }
}
