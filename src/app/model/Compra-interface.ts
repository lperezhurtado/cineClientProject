import { FacturaInterface } from './Factura-interface';
import { FormControl } from '@angular/forms';
import { EntradaInterface } from './Entrada-interface';
import { IEntity } from './Usuario-interface';
import { Pageable, Sort } from './shared-interface';

export interface CompraInterface {
  id:               number;
  precio:           number;
  fecha:            Date;
  descuentoUsuario: number;
  entrada:          EntradaInterface;
  factura:          FacturaInterface | null;
}

//No se le pasa idFactura porque se crea cuando se obtine el ID de la compra creada
export interface CompraNewInterface {
  id:               number | undefined;
  precio:           number;
  fecha:            Date;
  descuentoUsuario: number;
  entrada:          IEntity;
  factura:          IEntity | null;
}

export interface CompraFormInterface {
  precio:           FormControl<number>;
  fecha:            FormControl<Date>;
  descuentoUsuario: FormControl<number>;
  entrada:          FormControl<number>;
}

export interface CompraPageInterface {
  content:          CompraInterface[];
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
