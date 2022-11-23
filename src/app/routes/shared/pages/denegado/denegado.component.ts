import { ScriptsService } from './../../services/scripts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-denegado',
  templateUrl: './denegado.component.html',
  styleUrls: ['./denegado.component.scss']
})
export class DenegadoComponent implements OnInit {

  constructor(private script: ScriptsService) {
    script.Carga(['bg']);
  }

  ngOnInit(): void {
  }

}
