import { FormControl } from "@angular/forms";
import { Pageable, Sort } from "./shared-interface";
import { TipoUsuarioInterface } from "./TipoUsuario-interface";

export interface UsuarioInterface {
  id:            number;
  dni:           string;
  nombre:        string;
  apellido1:     string;
  apellido2:     string;
  login:         string;
  descuento:     number;
  email:         string;
  tipousuario:   TipoUsuarioInterface;
  facturasCount: number | null;
}

//JSON DATOS PAGINA DE USUARIOS
export interface UsuarioPageInterface {
  content:          UsuarioInterface[];
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

export interface IUsuarior2Form {
  id:             FormControl<number>;
  dni:            FormControl<string>,
  nombre:         FormControl<string>;
  apellido1:      FormControl<string>;
  apellido2:      FormControl<string>;
  email:          FormControl<string>;
  login:          FormControl<string>;
  password:       FormControl<string>,
  passwordC:       FormControl<string>,
  tipousuario:    FormControl<number>;
}

export interface IUsuario2Send {
  id:           number | undefined,
  dni:          string | undefined,
  nombre:       string | undefined,
  apellido1:    string | undefined,
  apellido2:    string | undefined,
  login:        string | undefined,
  password:     string | undefined,
  email:        string | undefined,
  tipousuario:  IEntity
}

export interface IUsuario2Update {
  id:           number,
  dni:          string,
  nombre:       string,
  apellido1:    string,
  apellido2:    string,
  login:        string,
  email:        string,
  tipousuario:  IEntity
}

export interface IEntity {
  id: number | undefined;
}
