import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { NewComponent } from './pages/new/new';


export const routes: Routes = [
    {path:'', component:HomeComponent }, //dirige directamente al home
    {path:'home', component:HomeComponent }, //si estamos en al ruta home redrige al home
    {path:'new', component:NewComponent } //si hacemos clic en añadir serie redrige a new
];
