import { TipoSalaInterface } from 'src/app/model/TipoSala-interface';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SalaNewInterface, SalaFormInterface, SalaInterface } from 'src/app/model/Sala-interface';
import { SalaService } from 'src/app/service/sala.service';
import { TipoSalaService } from 'src/app/service/tipo-sala.service';
import { Location } from '@angular/common';

declare let bootstrap: any;

@Component({
  templateUrl: './update-sala.component.html',
  styleUrls: ['./update-sala.component.css']
})
export class UpdateSalaComponent {

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
  ) {
    this.id = activatedRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.getSala();
  }

  back() {
    this.location.back();
  }

  getSala() {
    this.salaService.getSala(this.id).subscribe({
      next: (resp: SalaInterface) => {
        this.form =<FormGroup> this.formBuilder.group({
          id:       [resp.id],
          alto:     [resp.alto, [Validators.required,  Validators.maxLength(2)]],
          ancho:    [resp.ancho, [Validators.required, Validators.maxLength(2)]],
          tiposala: [resp.tiposala.id, [Validators.required]]
        });
      }
    });
  }

  updateSala() {
    this.sala = {
      id: this.form.value.id!,
      alto: this.form.value.alto!,
      ancho: this.form.value.ancho!,
      tipoSala: {id: this.form.value.tiposala}
    }

    if (this.form.valid) {
      this.salaService.updateSala(this.sala).subscribe({
        next: (resp: number) => {
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Sala " + resp + " actualizada";
          this.showModal();
        }
      });
    }
  }

  showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    });
    var myModalEl = document.getElementById(this.mimodal);
    if (myModalEl) {
      myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.router.navigate(['/admin/sala/view', this.sala.id])
      })
    }
    this.myModal.show()
  }

  openModalFindUsertype(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findUsertype"), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show()
  }

  closeTeamModal(id_tiposala: number) {
    this.form.controls['tiposala'].setValue(id_tiposala);

    this.updateUserTypeDescription(id_tiposala);
    this.myModal.hide();
  }

  updateUserTypeDescription(id_tiposala: number) {
    this.tipoSalaService.getTipoSala(id_tiposala).subscribe({
      next: (data: TipoSalaInterface) => {
        this.tipoSalaDescription = data.nombre;
        return this.tipoSalaDescription;
      },
      error: (error: any) => {
        this.tipoSalaDescription = "No se ha encontrado";
        this.form.controls['tiposala'].setErrors({'incorrect': true});
      }
    });
  }
}
