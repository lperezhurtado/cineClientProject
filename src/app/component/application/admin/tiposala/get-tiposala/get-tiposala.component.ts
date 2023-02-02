import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoSalaInterface } from 'src/app/model/TipoSala-interface';
import { TipoSalaService } from 'src/app/service/tipo-sala.service';

@Component({
  selector:'app-get-tiposala',
  templateUrl: './get-tiposala.component.html',
  styleUrls: ['./get-tiposala.component.css']
})
export class GetTiposalaComponent {

  id: number;
  tiposala!: TipoSalaInterface;

  constructor(
    private salaService: TipoSalaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getSala();
  }

  getSala() {
    this.salaService.getTipoSala(this.id).subscribe({
      next: (resp: TipoSalaInterface) => {
        this.tiposala = resp;
        console.log(this.tiposala);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['admin/tiposala/list']);
  }
}
