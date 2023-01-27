import { GeneroInterface } from './Genero-interface';
import { Pageable, Sort } from "./shared-interface";

export interface PeliculaInterface {
  id:              number;
  titulo:          string;
  year:             number;
  duracion:        number;
  director:        string;
  fechaAlta:       Date;
  fechaBaja:       null;
  versionNormal:   boolean;
  versionEspecial: boolean;
  genero:          GeneroInterface;
  imagen:          string;
  sesionesCount:   number;
}

export interface PeliculaPageInterface {
  content:          PeliculaInterface[];
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