import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoSalaInterface } from 'src/app/model/TipoSala-interface';
import { TipoSalaService } from 'src/app/service/tipo-sala.service';
import { environment } from 'src/environments/environment';

declare let bootstrap: any;

@Component({
  templateUrl: './update-tiposala.component.html',
  styleUrls: ['./update-tiposala.component.css']
})
export class UpdateTiposalaComponent {

  private entityUrl="/tiposala";
  tipoSala!: TipoSalaInterface;
  url = "";
  id: number;
  form!: FormGroup;

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
    this.url = `${environment.baseURL}${this.entityUrl}`;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id:[""],
      nombre:["", [Validators.required]]
    });
    this.getTipoSala();
  }

  back() {
    this.location.back();
  }

  getTipoSala() {
    this.tipoSalaService.getTipoSala(this.id).subscribe({
      next: (resp: TipoSalaInterface) => {
        console.log(resp);
        this.form = this.formBuilder.group({
          id:     [resp.id],
          nombre: [resp.nombre],
          count:  [resp.salasCount]
        });
      }
    });
  }

  updateTipoSala() {
    this.tipoSala = {
      id: this.form.value.id,
      nombre: this.form.value.nombre,
      salasCount: this.form.value.count
    }

    if (this.form.valid) {
      this.tipoSalaService.updateTipoSala(this.tipoSala).subscribe({
        next: (resp: number) => {
          console.log(resp);
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
