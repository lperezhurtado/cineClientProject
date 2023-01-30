import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TarifaInterface } from 'src/app/model/Tarifa-interface';
import { TarifaService } from 'src/app/service/tarifa.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './delete-tarifa.component.html',
  styleUrls: ['./delete-tarifa.component.css']
})
export class DeleteTarifaComponent {

  tarifa!: TarifaInterface;
  id: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private tarifaService: TarifaService,
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getGenero();
  }

  back() {
    this.location.back();
  }

  getGenero() {
    this.tarifaService.getTarifa(this.id).subscribe({
      next: (resp: TarifaInterface) => {
        console.log(resp);
        this.tarifa = resp;
      }
    });
  }

  deleteGenero(id: number){
    this.tarifaService.deleteTarifa(id).subscribe({
      next: (resp: number) => {
        console.log(resp);
      }
    });
  }
}
