import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-generate-usuario',
  templateUrl: './generate-usuario.component.html',
  styleUrls: ['./generate-usuario.component.css']
})
export class GenerateUsuarioComponent {

  @Input() cantidad: number = 0;
  @Output() enviar = new EventEmitter<number>();

  constructor() { }

  generar() {
    this.enviar.emit(this.cantidad);
  }

}
