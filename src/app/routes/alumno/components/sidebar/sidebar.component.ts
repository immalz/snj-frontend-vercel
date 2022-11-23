import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showFiller = false;
  user;
  imgPath = environment.IMAGEN;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user =  JSON.parse(localStorage.getItem('alumno'));
  }

}
