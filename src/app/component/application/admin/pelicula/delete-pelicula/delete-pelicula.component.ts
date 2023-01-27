import { PeliculaService } from './../../../../../service/pelicula.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare let bootstrap: any;

@Component({
  templateUrl: './delete-pelicula.component.html',
  styleUrls: ['./delete-pelicula.component.css']
})
export class DeletePeliculaComponent implements OnInit {

  id: number = 0;
  msg: string = "";

  constructor(
    protected location: Location,
    private peliculaService: PeliculaService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = activatedRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
  }

  removeOne() {
    this.peliculaService.deletePelicula(this.id).subscribe({
      next: (resp: number) => {
        this.msg = "Pelicula " + this.id + " borrada";

        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })

        myModal.show();
        this.location.back();
      }
    });
  }

}
