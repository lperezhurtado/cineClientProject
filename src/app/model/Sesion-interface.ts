import { FormControl } from '@angular/forms';
import { IEntity } from './Usuario-interface';
import { TarifaInterface } from 'src/app/model/Tarifa-interface';
import { PeliculaInterface } from 'src/app/model/Pelicula-interface';
import { SalaInterface } from 'src/app/model/Sala-interface';
import { Pageable, Sort } from './shared-interface';

export interface SesionInterface {
  id:            number;
  fechaHora:     Date;
  sala:          SalaInterface;
  pelicula:      PeliculaInterface;
  tarifa:        TarifaInterface;
  entradasCount: number | null;
}

export interface SesionFormInterface {
  id:            FormControl<number>;
  fechaHora:     FormControl<Date>;
  sala:         /* FormControl<SalaInterface>*/ FormControl<number>
  pelicula:      /*FormControl<PeliculaInterface>*/ FormControl<number>;
  tarifa:        /*FormControl<TarifaInterface>*/ FormControl<number>;
}

//PARA CREAR Y ACTUALIZAR
export interface SesionNewInterface {
  id:            number;
  fechaHora:     Date;
  sala:          IEntity;
  pelicula:      IEntity;
  tarifa:        IEntity;
}

export interface SesionPageInterface {
  content:          SesionInterface[];
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

