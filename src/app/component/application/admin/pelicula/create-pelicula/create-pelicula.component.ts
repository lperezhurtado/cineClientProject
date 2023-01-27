import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './create-pelicula.component.html',
  styleUrls: ['./create-pelicula.component.css']
})
export class CreatePeliculaComponent implements OnInit {

  id = new FormControl('');
  titulo = new FormControl('');
  director = new FormControl('');
  year = new FormControl('');
  duracion = new FormControl('');
  fAlta = new FormControl('');
  fBaja = new FormControl('');
  formData = new FormData();



  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  createPelicula() {
    let pelicula = {titulo: this.titulo.value,
                    director: this.director.value,
                    year: this.year.value,
                    duracion: this.duracion.value,
                    fechaAlta: this.fAlta.value,
                    fechaBaja: this.fBaja.value};

    this.formData.append("pelicula", JSON.stringify(pelicula));
  }

  fileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.append("fichero", file);
  }


}
