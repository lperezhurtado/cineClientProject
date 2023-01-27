import { FormControl } from "@angular/forms";

export interface LoginInterface {
  login:      FormControl<string>;
  password:   FormControl<string>;
}
