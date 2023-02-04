import { TarifaFormInterface } from './../../../../../model/Tarifa-interface';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TarifaInterface } from 'src/app/model/Tarifa-interface';
import { TarifaService } from 'src/app/service/tarifa.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

declare let bootstrap: any;

@Component({
  selector: 'app-create-tarifa',
  templateUrl: './create-tarifa.component.html',
  styleUrls: ['./create-tarifa.component.css']
})
export class CreateTarifaComponent {

  tarifa!: TarifaInterface;
  id!: number;
  form!: FormGroup<TarifaFormInterface>;

  //modals
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tarifaService: TarifaService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.form = <FormGroup>this.formBuilder.group({
      id:[""],
      nombre:["", [Validators.required]],
      precio:["", [Validators.required, Validators.pattern('')]]
    });
  }

  back() {
    this.location.back();
  }

  createTarifa() {
    this.tarifa = {
      id: this.form.value.id!,
      nombre: this.form.value.nombre!,
      precio: this.form.value.precio!
    }

    if (this.form.valid) {
      this.tarifaService.createTarifa(this.tarifa).subscribe({
        next: (resp: number) => {
          this.id = resp;
          console.log(this.id);
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Tarifa " + resp + " añadida";
          this.showModal();
        }
      })
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
      });
    }
    this.myModal.show()
  }

}
