import { TarifaService } from 'src/app/service/tarifa.service';
import { PeliculaService } from 'src/app/service/pelicula.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SesionInterface, SesionNewInterface, SesionFormInterface } from './../../../../../model/Sesion-interface';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SalaService } from 'src/app/service/sala.service';
import { SesionService } from 'src/app/service/sesion.service';
import { SalaInterface } from 'src/app/model/Sala-interface';
import { PeliculaInterface } from 'src/app/model/Pelicula-interface';
import { TarifaInterface } from 'src/app/model/Tarifa-interface';
declare let bootstrap: any;

@Component({
  templateUrl: './create-sesion.component.html',
  styleUrls: ['./create-sesion.component.css']
})
export class CreateSesionComponent {

  sesion!: SesionNewInterface;
  error = "";
  id!: number;
  form!: FormGroup<SesionFormInterface>;

  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  salaDescription: string = "Sala";
  peliculaDescription: string = "Pelicula";
  tarifaDescription: string = "Tarifa";

  es: any = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    today: 'Hoy',
    clear: 'Borrar',
    dateFormat: 'mm/dd/yyyy',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sesionService: SesionService, //PRINCIPAL
    private formBuilder: FormBuilder,
    private salaService: SalaService,
    private peliculaService: PeliculaService,
    private tarifaService: TarifaService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.form = <FormGroup>this.formBuilder.group({
      id:[""],
      sala:["", [Validators.required]],
      pelicula:["", [Validators.required]],
      tarifa:["", [Validators.required]],
      fechaHora:["", [Validators.required]]
    });
  }

  back() {
    this.location.back();
  }

  createSesion() {
    this.sesion = {
      id: this.form.value.id!,
      fechaHora: this.form.value.fechaHora!,
      sala: {id: this.form.value.sala!},
      pelicula: {id: this.form.value.pelicula},
      tarifa: {id: this.form.value.tarifa},
    }

    if (this.form.valid) {
      this.sesionService.createSesion(this.sesion).subscribe({
        next: (resp: number) => {
          this.id = resp;
          console.log(resp);
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Sesión " + resp + " añadida";
          this.showModal();
        },
        error: (error: any) => {         //recoge errores que llegan del servidor en las validaciones
          this.error = error.error.message;
          //this.popup(error.error.message,"error");
          console.log(error);
        }
      });
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

}
