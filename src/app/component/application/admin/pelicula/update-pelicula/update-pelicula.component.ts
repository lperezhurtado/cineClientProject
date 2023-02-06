import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneroService } from 'src/app/service/genero.service';
import { PeliculaService } from 'src/app/service/pelicula.service';
import { Location } from '@angular/common';
import { PeliculaInterface } from 'src/app/model/Pelicula-interface';
import { environment } from 'src/environments/environment';
import { GeneroInterface } from 'src/app/model/Genero-interface';

declare let bootstrap: any;

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

  generoDescription: string = "";

  //modals
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

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
        this.pelicula.fechaAlta = new Date(resp.fechaAlta);

        this.src = this.getURLimage(resp.imagen);
        console.log(resp.imagen);
        this.generoDescription = resp.genero.nombre;
        this.form = this.formBuilder.group({
          id:       [resp.id],
          titulo:   [resp.titulo, [Validators.required]],
          year:     [resp.year, [Validators.required, Validators.min(2000), Validators.max(2026)]],
          duracion: [resp.duracion, [Validators.required, Validators.min(60), Validators.max(290)]],
          director: [resp.director, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
          sinopsis: [resp.sinopsis, [Validators.required]],
          fAlta:    [resp.fechaAlta, [Validators.required]],
          fBaja:    [resp.fechaBaja],
          normal:   [resp.versionNormal],
          especial: [resp.versionEspecial],
          genero:   [resp.genero.id, [Validators.required, Validators.pattern(/^\d{1,15}$/)]]
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

        this.idAux = resp;
        console.log("ID",this.idAux);

        this.modalTitle = "Cine MatriX";
        this.modalContent = "Pelicula " + resp + " actualizada";
        this.showModal();
      }
    })
  }

  fileSel!: File;
  fileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileSel = file;//BORRAR
    this.formData.append("fichero", file);
  }

  updateGeneroDescription(id_genero: number) {
    this.generoService.getOne(id_genero).subscribe({
      next: (resp: GeneroInterface) => {
        this.generoDescription = resp.nombre;
        return this.generoDescription;
      },
      error: (error: any) => {
        this.generoDescription = "No se ha encontrado";
        //this.form.controls['tiposala'].setErrors({'incorrect': true});
      }
    });
  }

  showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    });
    var myModalEl = document.getElementById(this.mimodal);
    if (myModalEl) {
       myModalEl.addEventListener('hidden.bs.modal', (event): void => {

      this.router.navigate(['/admin/pelicula/view/', this.idAux]);
      });
    }
    this.myModal.show()
  }

  openModalFindGenero() {
    this.myModal = new bootstrap.Modal(document.getElementById("findGenero"), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show()
  }

  closeGeneroModal(id_genero: number) {
    this.form.controls['genero'].setValue(id_genero);
    //this.genero.setValue(id_genero);
    this.updateGeneroDescription(id_genero);
    this.myModal.hide();
  }

}
