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
  facturasCount: number;
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
