import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SerieService } from '../../services/serieservice';
import { Serie } from '../../models/serie';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new.html',
})
export class NewComponent {

  //si hay un serietId editará y sino añadirá la serie
  serietId?: number; 
  
  form = new FormGroup({ 
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }), 
    channel: new FormControl('', { nonNullable: true, validators: [Validators.required] }), 
    rating: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }), 
    creator: new FormControl('', { nonNullable: true, validators: [Validators.required] }), 
    dates: new FormControl('', { nonNullable: true, validators: [Validators.required] }), 
    image: new FormControl('', { nonNullable: true, validators: [Validators.required] }), 
  });

  constructor(
    private route: ActivatedRoute,
    private serieService: SerieService,
    private router: Router
  ) {

    //creamos el formulario vacío para rellenarlo con los campos de la serie
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) return of(null); //si el id es null se carga vacio el form

        this.serietId = Number(id); // si hay id entonces se carga con los dartos
        return this.serieService.getById(this.serietId);
      })
    ).subscribe(serie => { 
      if (serie) { //si llega el formulario se rellena
        this.form.patchValue({
          title: serie.title, 
          channel: serie.channel, 
          rating: serie.rating, 
          creator: serie.creator, 
          dates: serie.dates, 
          image: serie.image
        });
      }
    });
  }

  save() { 
    if (this.form.invalid) return; 
    
    const payload: Serie = {
      id: this.serietId ?? 0, 
      title: this.form.controls.title.value, 
      channel: this.form.controls.channel.value, 
      rating: this.form.controls.rating.value!, 
      creator: this.form.controls.creator.value, 
      dates: this.form.controls.dates.value,
      image: this.form.controls.image.value, 
    }; 
    
     this.serieService.create(payload).subscribe({ 
      next: (res) => { 
        alert(`Serie creada con ID: ${res.id}`); 
        this.router.navigate(['/home']); 
      }, 
      error: (e) => console.error('Error guardando:', e), }); }

}
