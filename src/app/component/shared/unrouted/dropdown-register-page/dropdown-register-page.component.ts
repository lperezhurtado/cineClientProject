import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-register-page',
  templateUrl: './dropdown-register-page.component.html',
  styleUrls: ['./dropdown-register-page.component.css']
})
export class DropdownRegisterPageComponent {

  @Input() PageSize!: number;
  @Output() eeRpp = new EventEmitter<number>();

  constructor() { }

  onChangeRpp(nRpp:number){
    this.eeRpp.emit(nRpp);
  }

}
