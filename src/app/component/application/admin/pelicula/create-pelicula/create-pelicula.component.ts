import { PeliculaService } from './../../../../../service/pelicula.service';
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
  //fBaja = new FormControl('');
  formData = new FormData();


  constructor(
    private httpClient: HttpClient,
    private peliculaService: PeliculaService
  ) { }

  ngOnInit(): void {
  }

  createPelicula() {
    let pelicula = {titulo: this.titulo.value,
                    year: this.year.value,
                    duracion: this.duracion.value,
                    director: this.director.value,
                    versionNormal:true,
                    versionEspecial:true,
                    genero:{id:1},
                    fechaAlta: this.fAlta.value
                   // fechaBaja: this.fBaja.value};
                  };

    console.log(this.fAlta.value);
    this.formData.append("pelicula", JSON.stringify(pelicula));
    this.peliculaService.createPelicula(this.formData).subscribe({
      next: (data: number) => {
        console.log(data);
      }
    });
  }

  fileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.append("fichero", file);
  }


}
