import { PeliculaService } from './../../../service/pelicula.service';
import { PeliculaPageInterface } from 'src/app/model/Pelicula-interface';
import { TarifaService } from 'src/app/service/tarifa.service';
import { Component, OnInit } from '@angular/core';
import { TarifaPageInterface } from 'src/app/model/Tarifa-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalTarifas: number = 0;
  tarifas!: TarifaPageInterface;
  totalPelicula: number = 0;
  peliculas!: PeliculaPageInterface;

  private entityUrl="/pelicula";
  url: string = "";

  constructor(
    private tarifaService: TarifaService,
    private peliculaService: PeliculaService
  ) { this.url = `${environment.baseURL}${this.entityUrl}`; }

  ngOnInit(): void {
    this.countTarifa();
    this.getPageTarifa();
    this.getPagePelicula();
  }

  countTarifa() {
    this.tarifaService.countTarifa().subscribe({
      next: (resp: number) => {
        this.totalTarifas = resp;
        console.log(resp);
      }
    })
  }

  getPageTarifa() {
    this.tarifaService.plistTarifa(0, this.totalTarifas, '', '', '')
    .subscribe({
      next: (resp: TarifaPageInterface) => {
        this.tarifas = resp;
        console.log(this.tarifas);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  getPagePelicula() {
    this.peliculaService.getPlistPelicula(0, 5, '', 0, '', '')
    .subscribe({
      next: (respFromServer: PeliculaPageInterface) => {
        this.peliculas = respFromServer;
        console.log(respFromServer);
      },
      error: (error: HttpErrorResponse) => {
        console.log("entra al error");
        console.log(error);
      }
    });
  }

  getURLimage(images: string): string{
    let result =this.url +'/images/'+images;
    return result;
  }

}
