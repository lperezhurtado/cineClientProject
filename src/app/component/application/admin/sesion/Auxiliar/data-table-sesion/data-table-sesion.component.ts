import { SesionService } from './../../../../../../service/sesion.service';
import { SesionInterface } from './../../../../../../model/Sesion-interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector:'app-data-table-sesion',
  templateUrl: './data-table-sesion.component.html',
  styleUrls: ['./data-table-sesion.component.css']
})
export class DataTableSesionComponent implements OnInit{
  @Input() id!: number;
  sesion!: SesionInterface;

  constructor(
    private sesionService: SesionService
    ) {}

    ngOnInit(): void {
      this.getSesion();
    }

    getSesion() {
      this.sesionService.getSesion(this.id).subscribe({
        next: (resp: SesionInterface) => {
          this.sesion = resp;
          console.log(this.sesion);
          console.log("ENTRA DATA TABLE");
        }
      });
    }
}
