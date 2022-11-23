import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';

import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(): any{
    if (localStorage.getItem('rol') === 'director') {
      return true;
    } else {
      this.router.navigate(['/404']);
    }
  }
}
