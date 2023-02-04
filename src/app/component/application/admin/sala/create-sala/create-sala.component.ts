import { SalaFormInterface } from './../../../../../model/Sala-interface';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SalaNewInterface } from 'src/app/model/Sala-interface';
import { SalaService } from 'src/app/service/sala.service';
import { TipoSalaService } from 'src/app/service/tipo-sala.service';
import { Location } from '@angular/common';
import { TipoSalaInterface } from 'src/app/model/TipoSala-interface';

declare let bootstrap: any;

@Component({
  templateUrl: './create-sala.component.html',
  styleUrls: ['./create-sala.component.css']
})
export class CreateSalaComponent {

  sala!: SalaNewInterface;
  error = "";
  id!: number;
  form!: FormGroup<SalaFormInterface>;

  //modals
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  tipoSalaDescription: string = "Tipo de sala";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private salaService: SalaService,
    private formBuilder: FormBuilder,
    private tipoSalaService: TipoSalaService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.form = <FormGroup>this.formBuilder.group({
      id:[""],
      alto:["", [Validators.required, Validators.min(3), Validators.maxLength(2)]],
      ancho:["", [Validators.required, Validators.min(3), Validators.maxLength(2)]],
      tiposala:["", [Validators.required]]
    });
  }


  back() {
    this.location.back();
  }

  createSala() {
    this.sala = {
      id: this.form.value.id!,
      alto: this.form.value.alto!,
      ancho: this.form.value.ancho!,
      tipoSala: {id: this.form.value.tiposala}
    }

    if (this.form.valid) {
      this.salaService.createSala(this.sala).subscribe({
        next: (resp: number) => {
          this.id = resp;
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Sala " + resp + " añadida";
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

  updateTipoSalaDescription(id_tiposala: number) {
    this.tipoSalaService.getTipoSala(id_tiposala).subscribe({
      next: (resp: TipoSalaInterface) => {
        this.tipoSalaDescription = resp.nombre;
        return this.tipoSalaDescription;
      },
      error: (error: any) => {
        this.tipoSalaDescription = "No se ha encontrado";
        this.form.controls['tiposala'].setErrors({'incorrect': true});
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

      this.router.navigate(['/admin/sala/view/', this.id])
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

  openModalFindTipoSala(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findTipoSala"), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show()
  }

  closeTipoSalaModal(id_tiposala: number) {
    this.form.controls['tiposala'].setValue(id_tiposala);
    this.updateTipoSalaDescription(id_tiposala);
    this.myModal.hide();
  }

}
