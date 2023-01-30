import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneroService } from 'src/app/service/genero.service';
import { PeliculaService } from 'src/app/service/pelicula.service';
import { Location } from '@angular/common';
import { PeliculaInterface } from 'src/app/model/Pelicula-interface';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './update-pelicula.component.html',
  styleUrls: ['./update-pelicula.component.css']
})
export class UpdatePeliculaComponent implements OnInit {

  pelicula!: PeliculaInterface;
  private entityUrl="/pelicula";
  url = "";
  src!:string;
  idAux: number

  form!: FormGroup;
  formData = new FormData();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private peliculaService: PeliculaService,
    private location: Location,
    private generoService: GeneroService,
    private formBuilder: FormBuilder
  ) {
    this.idAux = activatedRoute.snapshot.params['id'];
    this.url = `${environment.baseURL}${this.entityUrl}`;
  }

  ngOnInit(): void {
    this.getPelicula();
  }

  back() {
    this.location.back();
  }

  getPelicula() {
    this.peliculaService.getPelicula(this.idAux).subscribe({
      next: (resp: PeliculaInterface) => {
        this.pelicula = resp;
        this.src = this.getURLimage(resp.imagen);
        console.log(resp.imagen);

        this.form = this.formBuilder.group({
          id:       [resp.id],
          titulo:   [resp.titulo],
          year:     [resp.year],
          duracion: [resp.duracion],
          director: [resp.director],
          sinopsis: [resp.sinopsis],
          fAlta:    [resp.fechaAlta],
          fBaja:    [resp.fechaBaja],
          normal:   [resp.versionNormal],
          especial: [resp.versionEspecial],
          genero:   [resp.genero.id]
        });
      }
    });
  }

  getURLimage(images: string): string{
    let result =this.url +'/images/'+images;
    return result;
  }

  updatePelicula() {
    let pelicula = {
      id: this.form.value.id,
      titulo: this.form.value.titulo,
      year: this.form.value.year,
      duracion: this.form.value.duracion,
      director: this.form.value.director,
      sinopsis: this.form.value.sinopsis,
      fechaAlta: this.form.value.fAlta,
      fechaBaja: this.form.value.fBaja,
      versionNormal: this.form.value.normal,
      versionEspecial: this.form.value.especial,
      genero: {id: this.form.value.genero}
    }

    this.formData.append("pelicula", JSON.stringify(pelicula));

    this.peliculaService.updatePelicula(this.formData).subscribe({
      next: (resp: number) => {
        console.log(resp);
      }
    })
  }

  fileSel!: File;
  fileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileSel = file;//BORRAR
    this.formData.append("fichero", file);
  }
}
