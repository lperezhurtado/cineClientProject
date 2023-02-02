import { GeneroService } from './../../../../../service/genero.service';
import { GeneroInterface } from './../../../../../model/Genero-interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

declare let bootstrap: any;

@Component({
  templateUrl: './create-genero.component.html',
  styleUrls: ['./create-genero.component.css']
})
export class CreateGeneroComponent implements OnInit{

  genero!: GeneroInterface;
  private entityUrl:string =  "/genero";
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
    private generoService: GeneroService,
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

  createGenero() {
    this.genero = {
      id: this.form.value.id,
      nombre: this.form.value.nombre,
      peliculasCount: null
    }

    if (this.form.valid) {
      this.generoService.createGenero(this.genero).subscribe({
        next: (resp: number) => {
          this.id = resp;
          console.log(this.id);
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Género " + resp + " añadido";
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

      this.router.navigate(['/admin/genero/lista'])
      });
    }
    this.myModal.show()
  }

}
