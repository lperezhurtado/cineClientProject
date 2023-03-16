import { UsuarioService } from 'src/app/service/usuario.service';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table-usuario',
  templateUrl: './data-table-usuario.component.html',
  styleUrls: ['./data-table-usuario.component.css']
})
export class DataTableUsuarioComponent implements OnInit {

  @Input() id!: number;
  usuario!: UsuarioInterface;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() {
    this.usuarioService.getUsuario(this.id).subscribe({
      next: (data: UsuarioInterface) => {
        this.usuario = data;
        //console.log(this.usuario);
      }
    });
  }

  ngOnChanges() {   //ha permitido meter el view en un modal
    this.getUsuario();
  }

  /*changeID(ev:any) {
    this.id = ev.target.value;
  }*/

}
