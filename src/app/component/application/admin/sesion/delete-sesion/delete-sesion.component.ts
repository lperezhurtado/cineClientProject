import { ActivatedRoute } from '@angular/router';
import { SesionService } from './../../../../../service/sesion.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

declare let bootstrap: any;

@Component({
  templateUrl: './delete-sesion.component.html',
  styleUrls: ['./delete-sesion.component.css']
})
export class DeleteSesionComponent {

  id: number = 0;
  msg: string = "";

  constructor(
    protected location: Location,
    private sesionService: SesionService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  deleteSesion() {
    this.sesionService.deleteSesion(this.id).subscribe({
      next: (resp: number) => {
        this.msg = "Sesión "+this.id+" eliminada";

        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })

        myModal.show();
        this.location.back();
      }
    });
  }
}
