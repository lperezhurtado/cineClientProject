import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoSalaInterface } from 'src/app/model/TipoSala-interface';
import { TipoSalaService } from 'src/app/service/tipo-sala.service';
import { Location } from '@angular/common';

declare let bootstrap: any;

@Component({
  templateUrl: './delete-tiposala.component.html',
  styleUrls: ['./delete-tiposala.component.css']
})
export class DeleteTiposalaComponent {

  tipoSala!: TipoSalaInterface;
  id: number;
  msg: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private tipoSalaService: TipoSalaService,
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getTipoSala();
  }

  back() {
    this.location.back();
  }

  getTipoSala() {
    this.tipoSalaService.getTipoSala(this.id).subscribe({
      next: (resp: TipoSalaInterface) => {
        console.log(resp);
        this.tipoSala = resp;
      }
    });
  }

  deleteTipoSala(id: number){
    this.tipoSalaService.deleteTipoSala(id).subscribe({
      next: (resp: number) => {
        console.log(resp);
        this.msg = "Sala " + this.id + " eliminada";
        console.log("Tipo de sala "+resp+" borrada");

        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })

        myModal.show();
        this.location.back();
      }
    });
  }
}
