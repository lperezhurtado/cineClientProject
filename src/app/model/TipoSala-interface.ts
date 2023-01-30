import { Pageable, Sort } from "./shared-interface";

export interface TipoSalaInterface {
    id:           number;
    nombre:       string;
    salasCount:   number | null;
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
