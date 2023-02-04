import { PeliculaFormInterface, PeliculaNewInterface } from './../../../../../model/Pelicula-interface';
import { GeneroService } from './../../../../../service/genero.service';
import { PeliculaService } from './../../../../../service/pelicula.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
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

  id!: number;
  /*id = new FormControl();
  titulo = new FormControl('');
  year = new FormControl('');
  duracion = new FormControl('');
  director = new FormControl('');
  sinopsis = new FormControl('');
  fAlta = new FormControl('');
  fBaja = new FormControl();
  normal = new FormControl(true);
  especial = new FormControl(false);
  genero = new FormControl();*/

  iPelicula!: PeliculaNewInterface;

  formData = new FormData();
  form!:FormGroup<PeliculaFormInterface>;
  error: string = "";

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
    private formBuilder: FormBuilder,
    private location: Location,
    private generoService: GeneroService
  ) { }

  ngOnInit(): void {

    this.form = <FormGroup>this.formBuilder.group({
      id: [""],
      titulo: ["", [Validators.required, Validators.minLength(1)]],
      year: [, [Validators.required, Validators.min(2000), Validators.max(2026)]],
      duracion: ["", [Validators.required, Validators.min(60), Validators.max(290)]],
      director: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      sinopsis: ["", [Validators.required]],
      fechaAlta: [Date , [Validators.required]],
      fechaBaja: [null ],
      versionNormal: [true ],
      versionEspecial: [false ],
      genero:["", [Validators.required, Validators.pattern(/^\d{1,15}$/)]]
    });
  }

  back() {
    this.location.back();
  }
  //PRUEBA DE FORMULARIO CON CONTRO

  createPelicula() {
    //DE MOMENTO SE DEJA SIN MAS
    /*let pelicula = {titulo: this.titulo.value,
                    year: this.year.value,
                    duracion: this.duracion.value,
                    director: this.director.value,
                    sinopsis: this.sinopsis.value,
                    fechaAlta: this.fAlta.value,
                    fechaBaja: this.fBaja.value,
                    versionNormal:this.normal.value,
                    versionEspecial:this.especial.value,
                    genero: { id:this.genero.value}
                  };*/

    this.iPelicula = {
                    titulo: this.form.value.titulo!,
                    year: this.form.value.year!,
                    duracion: this.form.value.duracion!,
                    director: this.form.value.director!,
                    sinopsis: this.form.value.sinopsis!,
                    fechaAlta: this.form.value.fechaAlta!,
                    fechaBaja: this.form.value.fechaBaja!,
                    versionNormal:this.form.value.versionNormal!,
                    versionEspecial:this.form.value.versionEspecial!,
                    genero: { id:this.form.value.genero}
                  };

    this.formData.append("pelicula", JSON.stringify(this.iPelicula)); //se añade objetocon datos de formulario

    console.log(this.iPelicula.fechaAlta);
    if (this.form.valid) {
      this.peliculaService.createPelicula(this.formData).subscribe({
        next: (data: number) => {
          //this.id.setValue(data);
          this.id = data;
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Pelicula " + data + " añadida";
          this.showModal();
        },
        error: (error: any) => {         //recoge errores que llegan del servidor en las validaciones
          this.error = error.error.message;
          this.popupError(error.error.message,"error");
          console.log(error);
        }
      });
    } else {
      this.popupError("Por favor, rellena todos los campos","warning");
    }


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

  popupError(message: string, status: string) {
    Swal.fire({
        customClass : {
          title: 'swal2-title',
          cancelButton: 'swal2-cancel',
          confirmButton: 'swal2-confirm',
          input: 'swal2-input'
        },
        icon:<any>status,
        title: message,
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
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

      this.router.navigate(['/admin/pelicula/view/', this.id])
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
    //this.genero.setValue(id_genero);
    this.form.controls['genero'].setValue(id_genero);
    this.updateGeneroDescription(id_genero);
    this.myModal.hide();
  }

}
