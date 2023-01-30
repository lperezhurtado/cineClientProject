import { IEntity } from './Usuario-interface';
import { Pageable, Sort } from './shared-interface';
import { TipoSalaInterface } from './TipoSala-interface';
import { FormControl } from '@angular/forms';

export interface SalaInterface {
  id:         number;
  alto:       number;
  ancho:      number;
  tiposala:   TipoSalaInterface;
  salasCount: number | null
}
//PARA HACER FORM
export interface SalaFormInterface {
  id:         FormControl<number>;
  alto:       FormControl<number>;
  ancho:      FormControl<number>;
  tiposala:   FormControl<number>;
}
//PARA CREAR Y ACTUALIZAR
export interface SalaNewInterface {
  id:         number;
  alto:       number;
  ancho:      number;
  tipoSala:   IEntity;
}

export interface SalaPageInterface {
  content:          SalaInterface[];
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
