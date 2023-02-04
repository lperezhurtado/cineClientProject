import { FormControl } from '@angular/forms';
import { Pageable, Sort } from "./shared-interface";

export interface TipoSalaInterface {
    id:           number;
    nombre:       string;
    salasCount:   number;
}

export interface TipoSalaNewInterface {
  id:           number;
  nombre:       string;
}

export interface TipoSalaFormInterface {
  id:           FormControl<number>;
  nombre:       FormControl<string>;
}

export interface TSalaPageInterface {
  content:          TipoSalaInterface[];
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
