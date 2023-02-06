import { FormControl } from '@angular/forms';
import { IEntity } from './Usuario-interface';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
export interface FacturaInterface {
  id:       number;
  fecha:    Date
  iva:      number;
  total:    number;
  usuario:  UsuarioInterface;
}

export interface FacturaNewInterface {
  id:       number;
  fecha:    Date
  iva:      number;
  total:    number;
  usuario:  IEntity;
}

export interface FacturaFormInterface {
  id:       FormControl<number>;
  fecha:    FormControl<Date>;
  iva:      FormControl<number>;
  total:    FormControl<number>;
  usuario:  FormControl<number>;
}
