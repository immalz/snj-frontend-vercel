import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  panelOpenState = false;

  imgPath = environment.IMAGEN;

  user;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  this.user =  JSON.parse(localStorage.getItem('docente'));
  }

}
