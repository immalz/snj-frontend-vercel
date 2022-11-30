import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libretas',
  templateUrl: './libretas.component.html',
  styleUrls: ['./libretas.component.scss']
})
export class LibretasComponent implements OnInit{

  loading: boolean = false;
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  return(): void {
    this.router.navigate(['/docente/orden']);
  }

}
