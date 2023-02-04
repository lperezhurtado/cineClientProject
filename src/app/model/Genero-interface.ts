import { FormControl } from '@angular/forms';
import { Pageable, Sort } from "./shared-interface";

export interface GeneroInterface {
  id:             number;
  nombre:         string;
  peliculasCount: number | null;
}

export interface GeneroNewInterface {
  id:             number;
  nombre:         string;
}

export interface GeneroFormInterface {
  id:             FormControl<number>;
  nombre:         FormControl<string>;
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
