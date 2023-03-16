import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Location } from '@angular/common';

declare let bootstrap: any;
@Component({
  selector:'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent implements OnInit {

  id: number = 0;
  msg: string = "";

  constructor(
    protected location: Location,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

  removeOne() {
    this.usuarioService.deleteUsuario(this.id)
    .subscribe({
      next: (data: number) => {
        this.msg = "Usuario " + this.id + " eliminado";
        console.log("Usuario "+data+" borrado");

        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })

        myModal.show();
        this.location.back();
      }
    })
  }

}
