import { SesionInterface } from './../../../../../../model/Sesion-interface';
import { EntradaInterface } from './../../../../../../model/Entrada-interface';
import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preview-entrada',
  templateUrl: './preview-entrada.component.html',
  styleUrls: ['./preview-entrada.component.css']
})
export class PreviewEntradaComponent {

  @Input() entradas!: EntradaInterface[];
  @Input() sesion!: SesionInterface;

  private entityUrl="/pelicula";
  url = `${environment.baseURL}${this.entityUrl}`;

  getURLimage(images: string): string{
    let result =this.url +'/images/'+images;
    return result;
  }
}
