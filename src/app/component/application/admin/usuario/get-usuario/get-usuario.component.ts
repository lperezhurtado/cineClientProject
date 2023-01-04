import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-get-usuario',
  templateUrl: './get-usuario.component.html',
  styleUrls: ['./get-usuario.component.css']
})
export class GetUsuarioComponent implements OnInit {

  id: number = 0;
  usuario!: UsuarioInterface;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() {
    this.usuarioService.getUsuario(this.id).subscribe({
      next: (data: UsuarioInterface) => {
        this.usuario = data;

        console.log(this.usuario);
      }
    });
  }

}
