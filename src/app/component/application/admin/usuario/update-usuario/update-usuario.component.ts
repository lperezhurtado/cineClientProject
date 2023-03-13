import { Location } from '@angular/common';
import { TipoUsuarioService } from './../../../../../service/tipo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioInterface, IUsuarior2Form, IUsuario2Update } from 'src/app/model/Usuario-interface';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TipoUsuarioInterface } from 'src/app/model/TipoUsuario-interface';
import Swal from 'sweetalert2';

declare let bootstrap: any;

@Component({
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {

  id: number = 0;
  usuario!: UsuarioInterface;
  usuario2Form!: IUsuarior2Form;
  usuario2Update!: IUsuario2Update;
  form!: FormGroup<IUsuarior2Form>;
  error = ""; //guarda el error de validacion del servidor

  actualTipoUsuario!: number; //indicará si se ha cambiado el tipoUsuario

  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  // foreigns
  tipousuarioDescription: string = "Descripción de la ajena";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private tipoUsuarioService: TipoUsuarioService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.id = activatedRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.getOne();
  }

  back() {
    this.location.back();
  }

  getOne() {
    this.usuarioService.getUsuario(this.id).subscribe({
      next: (data: UsuarioInterface) => {
        this.usuario = data;
        console.log(data);
        this.form = <FormGroup>this.formBuilder.group({
          id: [data.id, [Validators.required]],
          dni:[data.dni,[Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i) ]],
          nombre: [data.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
          apellido1: [data.apellido1, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
          apellido2: [data.apellido2, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
          email: [data.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        login: [data.login, [Validators.required, Validators.minLength(4), Validators.maxLength(20), /*Validators.pattern('^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$')*/]],
          tipousuario: [data.tipousuario.id, [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
        });
        this.actualTipoUsuario = data.tipousuario.id;
        this.updateUserTypeDescription(this.usuario.tipousuario.id);
        //this.updateTeamDescription(this.oDeveloper.team.id);
      }
    })
  }

  onSubmit() {
    console.log("onSubmit");

    this.usuario2Update = {
      id: this.form.value.id!,
      dni: this.form.value.dni!,
      nombre: this.form.value.nombre!,
      apellido1: this.form.value.apellido1!,
      apellido2: this.form.value.apellido2!,
      email: this.form.value.email!,
      login: this.form.value.login!,
      tipousuario: { id: this.form.value.tipousuario! }
    }

    if (this.form.valid) {

      this.usuarioService.updateUsuario(this.usuario2Update).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Usuario " + this.id + " actualizado";
          this.showModal();
        },
        error: (error: any) => {         //recoge errores que llegan del servidor en las validaciones
          this.error = error.error.message;
          this.popup(error.error.message,"error");
          console.log(error.error.message);
        }
      })
    }
    else{
      this.popup("Todos los campos deben estar rellenados","warning");
    }

  }

  showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    });
    var myModalEl = document.getElementById(this.mimodal);
    if (myModalEl) {
      myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.router.navigate(['/admin/usuario/view', this.usuario2Update.id])
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

  closeTeamModal(id_usertype: number) {
    this.form.controls['tipousuario'].setValue(id_usertype);

    this.updateUserTypeDescription(id_usertype);
    this.myModal.hide();
  }

  updateUserTypeDescription(id_team: number) {
    this.tipoUsuarioService.getOne(id_team).subscribe({
      next: (data: TipoUsuarioInterface) => {
        this.tipousuarioDescription = data.nombre;
        return this.tipousuarioDescription;
      },
      error: (error: any) => {
        this.tipousuarioDescription = "No se ha encontrado";
        this.form.controls['tipousuario'].setErrors({'incorrect': true});
      }
    });
  }

  popup(message: string, status: string) {
    Swal.fire({
        customClass : {
          title: 'swal2-title',
          cancelButton: 'swal2-cancel',
          confirmButton: 'swal2-confirm',
          input: 'swal2-input'
        },
        icon:<any>status,
        title: message,
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
}

}
