import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SerieService } from '../../services/serieservice';
import { Serie } from '../../models/serie';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './home.html',
})

//Clase que carga las series del servicio y se encarga de escuchar los cambios y mostrarlos
export class HomeComponent {

  series$: Observable<Serie[]>;

  constructor(private serieService: SerieService) {
    this.series$ = this.serieService.getAll();
  }

}
