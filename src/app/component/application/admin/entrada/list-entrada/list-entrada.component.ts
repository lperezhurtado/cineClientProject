import { Location } from '@angular/common';
import { EntradaInterface } from './../../../../../model/Entrada-interface';
import { EntradaService } from './../../../../../service/entrada.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './list-entrada.component.html',
  styleUrls: ['./list-entrada.component.css']
})
export class ListEntradaComponent implements OnInit {

  resp!: EntradaInterface[];
  id!: number;

  ejex!:number[];
  filas: any[] = [];

  constructor(
    private entradaService: EntradaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getList();
    console.log("ID ONiNIT", this.id);
  }

  back() {
    this.location.back();
  }

  getList() {
    this.entradaService.getListEntrada(this.id).subscribe({
      next: (resp: EntradaInterface[]) => {
        this.resp = resp;

        let i = 0;
        let k = 0;
        let fila: EntradaInterface[] = [];
        resp.forEach( data => {
          if(data.ejeX == i){
            fila.push(data);
          } else {
            i++;
            if(data.ejeX ==  i ){
              this.filas.push(fila);
              fila = [];
              fila.push(data);
            } else {
              this.filas.push(fila);
              fila = [];
            }
          }
          k++;
          if(k == resp.length){
            this.filas.push(fila);
          }

        });
        console.log(this.filas);

      }
    });
  }

  mostrar(libre: boolean) {
    console.log(libre);

    console.log(libre !== libre);

  }

}
