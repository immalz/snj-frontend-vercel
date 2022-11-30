import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/routes/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuList: any = [];
  docente: any;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.docente = JSON.parse(localStorage.getItem('docente'));

    this.setItemList();
  }

  navigate(menu: any): void {

    // const found = this.menuList.find(element => element === menu);

    for (const item of this.menuList) {
        if(item === menu) {
          item['active'] = true;
          this.router.navigate([`docente/${item['route']}`])
        } else {
          item['active'] = false;
        }
    }
  }

  getShowSubMenu(role: any): any {
    const found = this.docente.roles.find(element => element.nombre === role);

    return found !== undefined ? true : false;
  }
  
  logout(): void {
    this.authService.loggout()
  }

  setItemList(): void {
    this.menuList = [
      {
        route: '/',
        title: 'Dashboard',
        icon: 'dashboard',
        active: true,
        role: 'director',
        submenu: []
      },
      {
        route: '/docentes',
        title: 'Docente',
        icon: 'group',
        active: false,
        role: 'director',
        submenu: []
      },
      {
        route: '/alumnos',
        title: 'Alumno',
        icon: 'person',
        active: false,
        role: 'director',
        submenu: []
      },
      {
        route: '/grados',
        title: 'Aulas',
        icon: 'folder_shared',
        active: false,
        role: 'director',
        submenu: []
      },
      {
        route: '/cursos',
        title: 'Curso',
        icon: 'book',
        active: false,
        role: 'director',
        submenu: []
      },
      {
        route: '/notas',
        title: 'Nota',
        icon: 'list_alt',
        active: false,
        role: 'docente',
        submenu: []
      },
      {
        route: '/notas',
        title: 'Nota',
        icon: 'list_alt',
        active: false,
        role: 'director',
        submenu: []
      },
      {
        route: '/revision',
        title: 'Revisión',
        icon: 'border_color',
        active: false,
        role: 'director',
        submenu: []
      },
      {
        route: '/revision',
        title: 'Revisión',
        icon: 'border_color',
        active: false,
        role: 'docente',
        submenu: []
      },
      {
        route: '/orden',
        title: 'Libretas',
        icon: 'bar_chart',
        active: false,
        role: 'director',
        submenu: []
      },
    ]
  }

}
