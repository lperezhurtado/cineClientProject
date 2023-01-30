import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from 'src/app/service/sala.service';
import { Location } from '@angular/common';
declare let bootstrap: any;

@Component({
  templateUrl: './delete-sala.component.html',
  styleUrls: ['./delete-sala.component.css']
})
export class DeleteSalaComponent {

  id: number = 0;
  msg: string = "";

  constructor(
    protected location: Location,
    private salaService: SalaService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  deleteSala() {
    this.salaService.deleteSala(this.id)
    .subscribe({
      next: (resp: number) => {
        this.msg = "Sala " + this.id + " eliminada";
        console.log("Sala "+resp+" borrada");

        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })

        myModal.show();
        this.location.back();
      }
    })
  }
}
