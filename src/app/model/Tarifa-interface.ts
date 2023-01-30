import { Pageable, Sort } from "./shared-interface";

export interface TarifaInterface {
  id:       number;
  nombre:   string;
  precio:   number;
}

export interface TarifaPageInterface {
  content:          TarifaInterface[];
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
