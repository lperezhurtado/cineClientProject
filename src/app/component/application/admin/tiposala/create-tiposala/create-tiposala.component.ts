import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoSalaInterface } from 'src/app/model/TipoSala-interface';
import { TipoSalaService } from 'src/app/service/tipo-sala.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

declare let bootstrap: any;

@Component({
  templateUrl: './create-tiposala.component.html',
  styleUrls: ['./create-tiposala.component.css']
})
export class CreateTiposalaComponent {

  tipoSala!: TipoSalaInterface;
  private entityUrl:string =  "/tiposala";
  url = "";
  id!: number;
  form!: FormGroup;

  //modals
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tipoSalaService: TipoSalaService,
    private location: Location
  ) {
    this.url = `${environment.baseURL}${this.entityUrl}`;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id:[""],
      nombre:["", [Validators.required]]
    });
  }

  back() {
    this.location.back();
  }

  createTipoSala() {
    this.tipoSala = {
      id: this.form.value.id,
      nombre: this.form.value.nombre,
      salasCount: null
    }

    if (this.form.valid) {
      this.tipoSalaService.createTipoSala(this.tipoSala).subscribe({
        next: (resp: number) => {
          this.id = resp;
          console.log(this.id);
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Tipo de sala " + resp + " añadida";
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

      this.router.navigate(['/admin/tiposala/view/', this.id])
      });
    }
    this.myModal.show()
  }
}
