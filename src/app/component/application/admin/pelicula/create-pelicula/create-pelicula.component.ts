import { GeneroService } from './../../../../../service/genero.service';
import { PeliculaService } from './../../../../../service/pelicula.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  templateUrl: './create-pelicula.component.html',
  styleUrls: ['./create-pelicula.component.css']
})
export class CreatePeliculaComponent implements OnInit {

  id = new FormControl('');
  titulo = new FormControl('');
  year = new FormControl('');
  duracion = new FormControl('');
  director = new FormControl('');
  sinopsis = new FormControl('');
  fAlta = new FormControl('');
  fBaja = new FormControl();
  normal = new FormControl(true);
  especial = new FormControl(false);
  genero = new FormControl();

  formData = new FormData();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private peliculaService: PeliculaService,
    private location: Location,
    private generoService: GeneroService
  ) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

  createPelicula() {
    let pelicula = {titulo: this.titulo.value,
                    year: this.year.value,
                    duracion: this.duracion.value,
                    director: this.director.value,
                    sinopsis: this.sinopsis.value,
                    fechaAlta: this.fAlta.value,
                    fechaBaja: this.fBaja.value,
                    versionNormal:this.normal.value,
                    versionEspecial:this.especial.value,
                    genero: { id: 1 /*this.genero.value*/ }
                  };
    this.formData.append("pelicula", JSON.stringify(pelicula));

    this.peliculaService.createPelicula(this.formData).subscribe({
      next: (data: number) => {
        console.log(data);
      }
    });
  }
  //INICIA EL PROCESO DE CREATE PELICULA
  checkFile() {
    if( this.fileSel === undefined || this.fileSel === null ) {
      this.popup();
    } else {
      this.createPelicula();
    }
  }

  fileSel!: File;
  fileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileSel = file;//BORRAR
    console.log(file);
    this.formData.append("fichero", file);
  }

  popup() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No se ha seleccionado ninguna imagen",
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar sin imagen'
    }).then((result) => {
      if (result.isConfirmed) {
        /*Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )*/
        this.createPelicula();
      }

    })

  }
}
