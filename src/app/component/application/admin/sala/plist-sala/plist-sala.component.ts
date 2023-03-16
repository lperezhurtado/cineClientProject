import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaPageInterface } from 'src/app/model/Sala-interface';
import { SalaService } from 'src/app/service/sala.service';

@Component({
  selector:'app-sala-plist',
  templateUrl: './plist-sala.component.html',
  styleUrls: ['./plist-sala.component.css']
})
export class PlistSalaComponent implements OnInit {

  respFromServer!: SalaPageInterface;
  usuarioSession!: string; //Por si acaso

  generated!: number;
  generados: boolean = false;
  msg: string = "";

  strTermFilter: string = "";
  id_usertypeFilter: number = 0;
  numberOfElements: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDirection: string = "";

  constructor(
    private salaService: SalaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {

    //console.log("localstorage: ",localStorage.getItem("usuario"));

    this.salaService.plistSala(this.page, this.numberOfElements, this.id_usertypeFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: SalaPageInterface) => {
          this.respFromServer = resp;
          if (this.page > resp.totalPages - 1) {
            this.page = resp.totalPages - 1;
          }
          console.log(resp);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }

  setPage(e: number) {
    this.page = (e - 1);
    this.getPage();
  }

  setRpp(rpp: number) {
    this.numberOfElements = rpp;
    this.page = 0;
    this.getPage();
  }

  setFilter(term: string): void {
    this.strTermFilter = term;
    this.getPage();
  }

  setFilterBySalatype(id: number): void {
    if (this.id_usertypeFilter != id) {
      this.id_usertypeFilter = id;
      this.page = 0;
    }
    else if(this.id_usertypeFilter == id){
      this.id_usertypeFilter = 0;
      this.page = 0;
    }

    this.getPage();
  }

  /*setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPage();
  }*/

  setOrder(order: string): void {

    if(this.sortField != order) {
      let icon = document.getElementById(this.sortField);
      icon?.classList.remove(icon?.classList.value.slice(3));
      icon?.classList.add('pi-sort-alt');
    }
    this.sortField = order;
    this.sortDirection = this.sortDirection == "asc"? "desc" : "asc";

    let icon = document.getElementById(order);
    this.sortDirection == "asc"? icon?.classList.replace(icon?.classList.value.slice(3),'pi-sort-numeric-down') : icon?.classList.replace(icon?.classList.value.slice(3),'pi-sort-numeric-up');

    this.getPage();
  }
}
