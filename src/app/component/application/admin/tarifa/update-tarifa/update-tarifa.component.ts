import { TarifaFormInterface } from './../../../../../model/Tarifa-interface';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TarifaInterface } from 'src/app/model/Tarifa-interface';
import { TarifaService } from 'src/app/service/tarifa.service';
import { environment } from 'src/environments/environment';

declare let bootstrap: any;

@Component({
  selector: 'app-update-tarifa',
  templateUrl: './update-tarifa.component.html',
  styleUrls: ['./update-tarifa.component.css']
})
export class UpdateTarifaComponent {

  tarifa!: TarifaInterface;
  id: number;
  form!: FormGroup<TarifaFormInterface>;

  //modals
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private tarifaService: TarifaService,
    private formBuilder: FormBuilder
  ){
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
      this.getTarifa();
  }

  back() {
    this.location.back();
  }

  getTarifa() {
    this.tarifaService.getTarifa(this.id).subscribe({
      next: (resp: TarifaInterface) => {
        this.form = <FormGroup> this.formBuilder.group({
          id:     [resp.id],
          nombre: [resp.nombre, [Validators.required]],
          precio: [resp.precio, [Validators.required ,  Validators.maxLength(5)]]
        });
      }
    });
  }

  updateTarifa() {
    this.tarifa = {
      id: this.form.value.id!,
      nombre: this.form.value.nombre!,
      precio: this.form.value.precio!
    }

    if (this.form.valid) {
      this.tarifaService.updateTarifa(this.tarifa).subscribe({
        next: (resp: number) => {
          this.id = resp;
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Tarifa " + resp + " actualizada";
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
      this.router.navigate(['/admin/tarifa/plist'])
      })
    }
    this.myModal.show()
  }
}
