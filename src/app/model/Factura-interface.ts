import { FormControl } from '@angular/forms';
import { IEntity } from './Usuario-interface';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { Pageable, Sort } from './shared-interface';
export interface FacturaInterface {
  id:       number;
  fecha:    Date
  iva:      number;
  total:    number;
  usuario:  UsuarioInterface;
}

export interface FacturaNewInterface {
  //id:       number;
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

export interface FacturaPageInterface {
  content:          FacturaInterface[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  numberOfElements: number;
  sort:             Sort;
  number:           number;
  first:            boolean;
  size:             number;
  empty:            boolean;
}
