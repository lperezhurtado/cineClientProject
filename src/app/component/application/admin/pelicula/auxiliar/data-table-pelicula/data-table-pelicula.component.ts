import { PeliculaService } from './../../../../../../service/pelicula.service';
import { PeliculaInterface } from './../../../../../../model/Pelicula-interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-table-pelicula',
  templateUrl: './data-table-pelicula.component.html',
  styleUrls: ['./data-table-pelicula.component.css']
})
export class DataTablePeliculaComponent implements OnInit {

  @Input() id!: number;
  pelicula!: PeliculaInterface;

  constructor(
    private peliculaService: PeliculaService
  ) { }

  ngOnInit(): void {
    this.getPelicula();
  }

  getPelicula() {
    this.peliculaService.getPelicula(this.id).subscribe({
      next: (resp: PeliculaInterface) => {
        this.pelicula = resp;
      }
    });
  }

}
