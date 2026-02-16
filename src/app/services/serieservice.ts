import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../models/serie';

@Injectable({
  providedIn: 'root', //este servicio estará disponible en toda la aplicación 
})

//el servicio se encarga de la lógica de la app, utiliza httpClient para los metodos crud
export class SerieService {
  private readonly url = 'https://peticiones.online/api/series'; //URL de la API
  
  constructor(private http: HttpClient) {} 
  
  //métodos CRUD
  getAll(): Observable<Serie[]> { 
    return this.http.get<Serie[]>(this.url); 
  } 

  getById(id: number): Observable<Serie> { 
    return this.http.get<Serie>(`${this.url}/${id}`); 
  }

  create(serie: Serie): Observable<Serie> { 
    return this.http.post<Serie>(this.url, serie); 
  } 
  

}

