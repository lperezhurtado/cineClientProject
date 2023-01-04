import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioInterface, IUsuarior2Form, IUsuario2Send } from 'src/app/model/Usuario-interface';
import { UsuarioService } from 'src/app/service/usuario.service';
declare let bootstrap: any;

@Component({
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {

  usuario!: UsuarioInterface;
  usuario2Form!: IUsuarior2Form;
  usuario2Send!: IUsuario2Send;
  form!: FormGroup<IUsuarior2Form>;

  //modals
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  tipousuarioDescription: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = <FormGroup>this.formBuilder.group({
      id: [""],
      dni: ["", [Validators.required, Validators.minLength(5)]],
      nombre: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      apellido1: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      apellido2: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      login: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      password: ["", [Validators.required, Validators.minLength(3)]],
      tipousuario: ["", [Validators.required, Validators.pattern(/^\d{1,6}$/)]]
    });
  }

  onSubmit() {
    console.log("onSubmit");
    this.usuario2Send = {
      id:this.form.value.id,
      dni: this.form.value.dni,
      nombre: this.form.value.nombre,
      apellido1: this.form.value.apellido1,
      apellido2: this.form.value.apellido2,
      email: this.form.value.email,
      login: this.form.value.login,
      password: this.form.value.password,
      tipousuario: { id: this.form.value.tipousuario }
    }
    if (this.form.valid) {
      this.usuarioService.createUsuario(this.usuario2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "Cine MatriX";
          this.modalContent = "Usuario " + data + " creado";
          this.showModal();
        }
      })
    }
  }

  showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    if (myModalEl) {
       myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.router.navigate(['/admin/usuario/view/', this.usuario2Send?.id])
      })
    }
    this.myModal.show()
  }

  openModalFindTeam(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findTeam"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.myModal.show()
  }

  openModalFindUsertype(): void {

  }

}
