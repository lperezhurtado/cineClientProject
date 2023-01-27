import { PeliculaService } from './../../../../../service/pelicula.service';
import { PeliculaInterface } from './../../../../../model/Pelicula-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './get-pelicula.component.html',
  styleUrls: ['./get-pelicula.component.css']
})
export class GetPeliculaComponent implements OnInit {

  id: number = 0;
  pelicula!: PeliculaInterface;

  constructor(
    private peliculaService: PeliculaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

  getPelicula() {
    this.peliculaService.getPelicula(this.id).subscribe({
      next: (resp: PeliculaInterface) => {
        this.pelicula = resp;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['admin/pelicula/plist']);
  }

}
