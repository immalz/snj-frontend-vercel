import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private URL = environment.URL + 'docente';

  constructor(private http: HttpClient, private router: Router) { }

  getRoles(): any {
    return this.http.get<any>(this.URL + '/roles');
  }

}
