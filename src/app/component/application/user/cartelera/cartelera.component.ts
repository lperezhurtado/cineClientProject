import { PeliculaPageInterface } from 'src/app/model/Pelicula-interface';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from 'src/app/service/pelicula.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent {

  count: number = 0;
  peliculas!: PeliculaPageInterface
  private entityUrl="/pelicula"
  url = "";

  filter: string = "";
  id_genero: number = 0;
  Rpp: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDir: string = "";

  constructor(
    private peliculaService: PeliculaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.url = `${environment.baseURL}${this.entityUrl}`;
   }

   ngOnInit(): void {
     this.getPage();
     this.countPelicula();
  }

   getURLimage(images: string): string{
    let result =this.url +'/images/'+images;
    return result;
  }
  countPelicula() {

    this.peliculaService.countPelicula().subscribe({
      next: (resp: number) => {
        this.count = resp;
        console.log("count ",resp);
      }
    })
  }

  getPage() {
    console.log("getpage count", this.count);
    this.peliculaService.getPlistPelicula(this.page, 20, this.filter, this.id_genero, this.sortField, this.sortDir)
    .subscribe({
      next: (respFromServer: PeliculaPageInterface) => {
        this.peliculas = respFromServer;
        if (this.page > respFromServer.totalPages - 1) {
          this.page = respFromServer.totalPages - 1;
        }
        console.log(respFromServer);
      },
      error: (error: HttpErrorResponse) => {
        console.log("entra al error");
        console.log(error);
      }
    });
  }
  //SETPAGE
  setPage(e: number) {
    this.page = (e - 1);
    this.getPage();
  }
  //INDICA CUANTOS RPP (REG POR PAG)
  setRpp(rpp: number) {
    this.Rpp = rpp;
    this.page = 0;
    this.getPage();
  }
  //INDICA FILTRO DE PALABRA
  setFilter(filter: string): void {
    this.filter = filter;
    this.getPage();
  }
  //INDICA FILTRO POR ID GENERO
  setIDGenero(id: number) {
    if (this.id_genero != id) {
      this.id_genero = id;
      this.page = 0;
    }
    else if (this.id_genero == id) {
      this.id_genero = 0;
      this.page = 0;
    }
    this.getPage();
  }
  //INDICA ORDEN
  setOrder(order: string) {
    this.sortField = order;
    if (this.sortDir == "asc") {
      this.sortDir = "desc";
    }
    else {
      this.sortDir = "asc";
    }
    this.getPage();
  }
}
