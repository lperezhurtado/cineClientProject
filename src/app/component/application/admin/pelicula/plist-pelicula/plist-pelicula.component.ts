import { PeliculaService } from './../../../../../service/pelicula.service';
import { PeliculaPageInterface } from './../../../../../model/Pelicula-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-plist-pelicula',
  templateUrl: './plist-pelicula.component.html',
  styleUrls: ['./plist-pelicula.component.css']
})
export class PlistPeliculaComponent implements OnInit {

  resp!: PeliculaPageInterface;

  filter: string = "";
  id_genero: number = 0;
  Rpp: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDir: string = "";

  private entityUrl="/pelicula"
  url = "";

  constructor(
    private peliculaService: PeliculaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.url = `${environment.baseURL}${this.entityUrl}`;
   }

  ngOnInit(): void {
    this.getPage();
  }

  getURLimage(images: string): string{
    let result =this.url +'/images/'+images;
    return result;
  }

  //GETPAGE
  getPage() {
    this.peliculaService.getPlistPelicula(this.page, this.Rpp, this.filter, this.id_genero, this.sortField, this.sortDir)
    .subscribe({
      next: (respFromServer: PeliculaPageInterface) => {
        this.resp = respFromServer;
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
