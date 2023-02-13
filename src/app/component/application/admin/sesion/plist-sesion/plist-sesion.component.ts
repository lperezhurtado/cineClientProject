import { formatDate, registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionPageInterface } from 'src/app/model/Sesion-interface';
import { SesionService } from 'src/app/service/sesion.service';

import localeES from "@angular/common/locales/es";


@Component({
  templateUrl: './plist-sesion.component.html',
  styleUrls: ['./plist-sesion.component.css']
})
export class PlistSesionComponent {

  resp!: SesionPageInterface;

  filter: string = "";
  id_pelicula: number = 0;
  id_sala: number = 0;
  id_tarifa: number = 0;
  Rpp: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDir: string = "";
  fecha!: Date;

  constructor(
    private sesionService: SesionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPage();
  }
  //GETPAGE
  getPage() {
    this.sesionService.getPlistSesion(this.page, this.Rpp, this.filter, this.id_sala, this.id_pelicula, this.id_tarifa, this.sortField, this.sortDir)
    .subscribe({
      next: (respFromServer: SesionPageInterface) => {
        this.resp = respFromServer;
        if (this.page > respFromServer.totalPages - 1) {
          this.page = respFromServer.totalPages - 1;
        }
        console.log(respFromServer);
        //console.log(respFromServer.content[0]?.fechaHora);
        //this.fecha = respFromServer.content[0]?.fechaHora


        //const format = formatDate(this.fecha,'dd/MM/yyyy - hh:mm', 'es-ES');
        //console.log("format",format);
        registerLocaleData(localeES, "es");

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
  //INDICA FILTRO POR ID PELICULA
  setIDPelicula(id: number) {
    if (this.id_pelicula != id) {
      this.id_pelicula = id;
      this.page = 0;
    }
    else if (this.id_pelicula == id) {
      this.id_pelicula = 0;
      this.page = 0;
    }
    this.getPage();
  }
  //INDICA FILTRO POR ID SALA
  setIDSala(id: number) {
    if (this.id_sala != id) {
      this.id_sala = id;
      this.page = 0;
    }
    else if (this.id_sala == id) {
      this.id_sala = 0;
      this.page = 0;
    }
    this.getPage();
  }
  //INDICA FILTRO POR ID TARIFA
  setIDTarifa(id: number) {
    if (this.id_tarifa != id) {
      this.id_tarifa = id;
      this.page = 0;
    }
    else if (this.id_tarifa == id) {
      this.id_tarifa = 0;
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
