import { GeneroInterface, GeneroNewInterface, GeneroFormInterface } from './../../../../../model/Genero-interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneroService } from 'src/app/service/genero.service';
import { Location } from '@angular/common';

declare let bootstrap: any;

@Component({
  templateUrl: './update-genero.component.html',
  styleUrls: ['./update-genero.component.css']
})
export class UpdateGeneroComponent implements OnInit {

  genero!: GeneroInterface;
  generoUpdate!: GeneroNewInterface;
  id: number;
  form!: FormGroup<GeneroFormInterface>;

  //modals
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private generoService: GeneroService,
    private formBuilder: FormBuilder
  ){
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getGenero();
  }

  back() {
    this.location.back();
  }

  getGenero() {
    this.generoService.getOne(this.id).subscribe({
      next: (resp: GeneroInterface) => {
        this.form = <FormGroup> this.formBuilder.group({
          id:     [resp.id],
          nombre: [resp.nombre, [Validators.required, Validators.minLength(1)]]
        });
      }
    });
  }

  updateGenero() {
    this.generoUpdate = {
      id: this.form.value.id!,
      nombre: this.form.value.nombre!,
    }

    if (this.form.valid) {
      this.generoService.updateGenero(this.genero).subscribe({
        next: (resp: number) => {
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Género " + resp + " actualizado";
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
      this.router.navigate(['/admin/genero/lista'])
      })
    }
    this.myModal.show()
  }
}
