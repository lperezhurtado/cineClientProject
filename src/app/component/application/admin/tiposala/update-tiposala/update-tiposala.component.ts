import { TipoSalaNewInterface, TipoSalaFormInterface } from './../../../../../model/TipoSala-interface';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoSalaInterface } from 'src/app/model/TipoSala-interface';
import { TipoSalaService } from 'src/app/service/tipo-sala.service';

declare let bootstrap: any;

@Component({
  templateUrl: './update-tiposala.component.html',
  styleUrls: ['./update-tiposala.component.css']
})
export class UpdateTiposalaComponent {

  tipoSala!: TipoSalaInterface;
  tipoSalaUpdate!: TipoSalaNewInterface;
  id: number;
  form!: FormGroup<TipoSalaFormInterface>;

  //modals
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private tipoSalaService: TipoSalaService,
    private formBuilder: FormBuilder
  ){
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getTipoSala();
  }

  back() {
    this.location.back();
  }

  getTipoSala() {
    this.tipoSalaService.getTipoSala(this.id).subscribe({
      next: (resp: TipoSalaInterface) => {
        this.form = <FormGroup> this.formBuilder.group({
          id:     [resp.id],
          nombre: [resp.nombre, [Validators.required, Validators.minLength(1)]]
        });
      }
    });
  }

  updateTipoSala() {
    this.tipoSalaUpdate = {
      id: this.form.value.id!,
      nombre: this.form.value.nombre!,
    }

    if (this.form.valid) {
      this.tipoSalaService.updateTipoSala(this.tipoSala).subscribe({
        next: (resp: number) => {
          this.id = resp;
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Tipo de sala " + resp + " actualizada";
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
      this.router.navigate(['/admin/tiposala/view', this.id])
      })
    }
    this.myModal.show()
  }
}
