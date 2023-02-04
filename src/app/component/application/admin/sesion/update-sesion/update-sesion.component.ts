import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SesionInterface, SesionFormInterface, SesionNewInterface } from './../../../../../model/Sesion-interface';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PeliculaInterface } from 'src/app/model/Pelicula-interface';
import { SalaInterface } from 'src/app/model/Sala-interface';
import { TarifaInterface } from 'src/app/model/Tarifa-interface';
import { PeliculaService } from 'src/app/service/pelicula.service';
import { SalaService } from 'src/app/service/sala.service';
import { SesionService } from 'src/app/service/sesion.service';
import { TarifaService } from 'src/app/service/tarifa.service';
import Swal from 'sweetalert2';

declare let bootstrap: any;

@Component({
  templateUrl: './update-sesion.component.html',
  styleUrls: ['./update-sesion.component.css']
})
export class UpdateSesionComponent implements OnInit {

  id: number = 0
  sesion!: SesionInterface;
  sesionForm!: SesionFormInterface;
  sesionNew!: SesionNewInterface;
  form!: FormGroup<SesionFormInterface>;
  error = "";
  //foreigns
  actualSala!: number;
  actualPelicula!: number;
  actualTarifa!: number;

  salaDescription: string = "Sala";
  peliculaDescription: string = "Pelicula";
  tarifaDescription: string = "Tarifa";


  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sesionService: SesionService,
    private salaService: SalaService,
    private peliculaService: PeliculaService,
    private tarifaService: TarifaService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.id = activatedRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.getOne();
  }

  back() {
    this.location.back();
  }
  //OBTIENE DATOS DE LA SESION
  getOne() {
    this.sesionService.getSesion(this.id).subscribe({
      next: (resp: SesionInterface) => {
        this.sesion = resp;
        this.sesion.fechaHora = new Date(resp.fechaHora);

        this.form = <FormGroup>this.formBuilder.group({
          id: [this.sesion.id, [Validators.required]],
          fechaHora: [this.sesion.fechaHora, Validators.required],
          sala:[this.sesion.sala.id,[Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
          pelicula: [this.sesion.pelicula.id, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
          tarifa: [this.sesion.tarifa.id, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
        });
        this.actualSala = resp.sala.id;
        this.actualPelicula = resp.pelicula.id;
        this.actualTarifa = resp.tarifa.id;

        this.updateSalaDescription(resp.sala.id);
        this.updatePeliculaDescription(resp.pelicula.id);
        this.updateTarifaDescription(resp.tarifa.id);
        //this.updateTeamDescription(this.oDeveloper.team.id);

        console.log("form");
        console.log(this.form);
      }
    })
  }

  //UPDATE
  updateSesion() {
    this.sesionNew = {
      id: this.form.value.id!,
      fechaHora: this.form.value.fechaHora!,
      sala: {id: this.form.value.sala},
      pelicula: {id: this.form.value.pelicula},
      tarifa: {id: this.form.value.tarifa}
    }

    if (this.form.valid) {
      this.sesionService.updateSesion(this.sesionNew).subscribe({
        next: (resp: number) => {
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Sesión " + this.id + " actualizada";
          this.showModal();
        },
        error: (error: any) => {         //recoge errores que llegan del servidor en las validaciones
          this.error = error.error.message;
          this.popup(error.error.message,"error");
          console.log(error.error.message);
        }
      });
    }
    else{
      this.popup("Todos los campos deben estar rellenados","warning");
    }
  }

   //SALA
   updateSalaDescription(id_sala: number) {
    this.salaService.getSala(id_sala).subscribe({
      next: (resp: SalaInterface) => {
        this.salaDescription = 'Sala'+resp.id+'('+resp.tiposala.nombre+')';
        return this.salaDescription;
      },
      error: (error: any) => {
        this.salaDescription = "No se ha encontrado";
        this.form.controls['sala'].setErrors({'incorrect': true});
      }
    });
  }
  //PELICULA
  updatePeliculaDescription(id_pelicula: number) {
    this.peliculaService.getPelicula(id_pelicula).subscribe({
      next: (resp: PeliculaInterface) => {
        this.peliculaDescription = resp.titulo;
        return this.peliculaDescription;
      },
      error: (error: any) => {
        this.peliculaDescription = "No se ha encontrado";
        this.form.controls['pelicula'].setErrors({'incorrect': true});
      }
    });
  }
  //TARIFA
  updateTarifaDescription(id_tarifa: number) {
    this.tarifaService.getTarifa(id_tarifa).subscribe({
      next: (resp: TarifaInterface) => {
        this.tarifaDescription = resp.nombre;
        return this.tarifaDescription;
      },
      error: (error: any) => {
        this.tarifaDescription = "No se ha encontrado";
        this.form.controls['tarifa'].setErrors({'incorrect': true});
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

      this.router.navigate(['/admin/sesion/view/', this.id])
      });
    }
    this.myModal.show()
  }

  openModalFindTeam(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findTeam"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.myModal.show()
  }
  //SALA
  openModalFindSala(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findSala"), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show()
  }

  closeSalaModal(id_tiposala: number) {
    this.form.controls['sala'].setValue(id_tiposala);
    this.updateSalaDescription(id_tiposala);
    this.myModal.hide();
  }
  //PELICULA
  openModalFindPelicula(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findPelicula"), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show()
  }

  closePeliculaModal(id_tiposala: number) {
    this.form.controls['pelicula'].setValue(id_tiposala);
    this.updatePeliculaDescription(id_tiposala);
    this.myModal.hide();
  }
  //TARIFA
  openModalFindTarifa(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findTarifa"), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show()
  }

  closeTarifaModal(id_tiposala: number) {
    this.form.controls['tarifa'].setValue(id_tiposala);
    this.updateTarifaDescription(id_tiposala);
    this.myModal.hide();
  }


  popup(message: string, status: string) {
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
}
