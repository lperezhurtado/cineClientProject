import { SesionPageInterface, SesionInterface } from './../../../../../model/Sesion-interface';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionService } from 'src/app/service/sesion.service';
import { formatDate, registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import localeES from "@angular/common/locales/es";

@Component({
  selector:'app-get-sesion-pelicula',
  templateUrl: './get-sesion-pelicula.component.html',
  styleUrls: ['./get-sesion-pelicula.component.css']
})
export class GetSesionPeliculaComponent {

  @Input() idPelicula!: number;
  sesiones!: SesionPageInterface;

  filter: string = "";
  id_pelicula: number = 0;
  id_sala: number = 0;
  id_tarifa: number = 0;
  Rpp: number = 10;
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
    //this.now();
  }

  now() {
    this.filter ="2023-02-10" //new Date().toISOString().slice(0,10);
    console.log("fecha filter ",this.filter);
    this.getPage();
  }

  fechas: any[] = [];
  //GETPAGE
  getPage() {
    this.sesionService.getPlistSesion(this.page, this.Rpp, this.filter, this.id_sala, this.idPelicula, this.id_tarifa, 'fechaHora', this.sortDir)
    .subscribe({
      next: (resp: SesionPageInterface) => {
        this.sesiones = resp;
        this.fecha = resp.content[0].fechaHora

        let horas : SesionInterface[] = [];
        let i = 0;
        console.log("fecha slice", this.fecha);
        resp.content.forEach(sesion => {
          console.log("forEach", this.fecha);
          if ( sesion.fechaHora.toString().includes(this.fecha.toString().slice(0,10))) {
            horas.push(sesion);
          } else {
            this.fechas.push(horas);
            horas = [];
            this.fecha = sesion.fechaHora;
            console.log("else",this.fecha);
            /*if (sesion.fechaHora.toString().includes(this.fecha.toString().slice(0,10))) {
              horas.push(sesion)
            }*/
            horas.push(sesion);
          }
          i++;
          if (i == resp.content.length) {
            this.fechas.push(horas)
            horas = [];
          }
        });
        console.log("matriz de fechas");
        console.log(this.fechas);

        if (this.page > resp.totalPages - 1) {
          this.page = resp.totalPages - 1;
        }
        console.log(resp);
        console.log(resp.content[0].fechaHora);
        this.fecha = resp.content[0].fechaHora
        console.log("toString",this.fecha.toString().slice(0,10));

        const format = formatDate(this.fecha,'dd/MM/yyyy - hh:mm', 'es-ES');
        console.log("format",format);
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
    this.fechas = [];
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
