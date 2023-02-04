import { GeneroService } from './../../../../../service/genero.service';
import { GeneroInterface, GeneroNewInterface, GeneroFormInterface } from './../../../../../model/Genero-interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare let bootstrap: any;

@Component({
  templateUrl: './create-genero.component.html',
  styleUrls: ['./create-genero.component.css']
})
export class CreateGeneroComponent implements OnInit{

  genero!: GeneroNewInterface;

  id!: number;
  form!: FormGroup<GeneroFormInterface>;
  error: string = "";

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
  ) { }

  ngOnInit(): void {
    this.form = <FormGroup> this.formBuilder.group({
      id:[""],
      nombre:["", [Validators.required, Validators.minLength(1)]]
    });
  }

  back() {
    this.location.back();
  }

  createGenero() {
    this.genero = {
      id: this.form.value.id!,
      nombre: this.form.value.nombre!
    }

    if (this.form.valid) {
      this.generoService.createGenero(this.genero).subscribe({
        next: (resp: number) => {
          this.id = resp;
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Género " + this.id + " añadido";
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
