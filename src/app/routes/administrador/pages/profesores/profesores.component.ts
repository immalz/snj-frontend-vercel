import { ProfesorService } from './../../services/profesor.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {

  docentes = [];

  imgPath = environment.IMAGEN;

  constructor(private docenteService: ProfesorService) { }

  ngOnInit(): void {
    this.getDocentes();
  }


  getDocentes(): any {
    this.docenteService.obtenerDocentes()
    .subscribe(
      res => {
        console.log(res);
        this.docentes = res;
      },
      err => console.log(err)
    );
    }
}
