import { FormControl } from '@angular/forms';
import { IEntity } from './Usuario-interface';
import { SesionInterface } from "./Sesion-interface";

export interface EntradaInterface {
  id:           number;
  ejeX:         number;
  ejeY:         number;
  libre:        boolean;
  sesion:       SesionInterface;
 //compras:      any[];
  //comprasCount: number;
}

export interface EntradaNewInterface {
  id:           number;
  ejeX:         number;
  ejeY:         number;
  libre:        boolean;
  sesion:       IEntity;
 //compras:      any[];
  //comprasCount: number;
}

export interface EntradaFormInterface {

  id:           FormControl< number>;
  ejeX:         FormControl< number>;
  ejeY:         FormControl< number>;
  libre:        FormControl< boolean>;
  sesion:       FormControl<SesionInterface >;
 //compras:      any[];
  //comprasCount: number;
}

