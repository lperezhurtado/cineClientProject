import { IEntity } from './Usuario-interface';
import { FormControl } from '@angular/forms';
import { GeneroInterface } from './Genero-interface';
import { Pageable, Sort } from "./shared-interface";

export interface PeliculaInterface {
  id:               number;
  titulo:           string;
  year:             number;
  duracion:         number;
  director:         string;
  sinopsis:         string,
  fechaAlta:        Date;
  fechaBaja:        Date | null;
  versionNormal:    boolean;
  versionEspecial:  boolean;
  genero:           GeneroInterface;
  imagen:           string;
  sesionesCount:    number;
}

export interface PeliculaNewInterface {
  //id:               number;
  titulo:           string;
  year:             number;
  duracion:         number;
  director:         string;
  sinopsis:         string,
  fechaAlta:        Date;
  fechaBaja:        Date | null;
  versionNormal:    boolean;
  versionEspecial:  boolean;
  genero:           IEntity;
}

export interface PeliculaFormInterface {
  id:               FormControl<number>;
  titulo:           FormControl<string>;
  year:             FormControl<number>;
  duracion:         FormControl<number>;
  director:         FormControl<string>;
  sinopsis:         FormControl<string>;
  fechaAlta:        FormControl<Date>;
  fechaBaja:        FormControl<Date | null>;
  versionNormal:    FormControl<boolean>;
  versionEspecial:  FormControl<boolean>;
  genero:           FormControl<number>;
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
