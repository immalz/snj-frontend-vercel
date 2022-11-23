import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {

  constructor() { }

  Carga(archivos: string[]): any {
    for (const archivo of archivos) {

        const script = document.createElement('script');
        script.src = './assets/js/' + archivo + '.js';

        const body = document.getElementsByTagName('body')[0];
        body.appendChild(script);
    }
  }
}
