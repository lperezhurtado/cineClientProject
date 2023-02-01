import { GeneroService } from './../../../../../service/genero.service';
import { PeliculaService } from './../../../../../service/pelicula.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
import { GeneroInterface } from 'src/app/model/Genero-interface';

declare let bootstrap: any;

@Component({
  templateUrl: './create-pelicula.component.html',
  styleUrls: ['./create-pelicula.component.css']
})
export class CreatePeliculaComponent implements OnInit {

  id = new FormControl();
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

  generoDescription: string = "Genero";

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
                    genero: { id:this.genero.value}
                  };
    this.formData.append("pelicula", JSON.stringify(pelicula));


    this.peliculaService.createPelicula(this.formData).subscribe({
      next: (data: number) => {
        this.id.setValue(data);
        console.log("ID",this.id);

        this.modalTitle = "Cine MatriX";
        this.modalContent = "Pelicula " + data + " añadida";
        this.showModal();
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

      this.router.navigate(['/admin/pelicula/view/', this.id.value])
      });
    }
    this.myModal.show()
  }

  openModalFindGenero(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findGenero"), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show()
  }

  closeGeneroModal(id_genero: number) {
    this.genero.setValue(id_genero);
    //this.form.controls['tiposala'].setValue(id_genero);
    this.updateGeneroDescription(id_genero);
    this.myModal.hide();
  }

}
