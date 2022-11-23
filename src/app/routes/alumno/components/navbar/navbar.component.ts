import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user =  JSON.parse(localStorage.getItem('alumno'));
  }
}
