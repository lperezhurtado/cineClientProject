import { Pageable, Sort } from "./shared-interface";

export interface GeneroInterface {
  id:             number;
  nombre:         string;
  peliculasCount: number | null;
}

export interface GeneroPageInterface {
  content:          GeneroInterface[];
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
