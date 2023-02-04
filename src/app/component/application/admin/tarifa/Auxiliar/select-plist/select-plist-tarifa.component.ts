import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TarifaPageInterface } from 'src/app/model/Tarifa-interface';
import { TarifaService } from 'src/app/service/tarifa.service';

@Component({
  selector:'app-select-tarifa',
  templateUrl: './select-plist-tarifa.component.html',
  styleUrls: ['./select-plist.component.css']
})
export class SelectPlistTarifaComponent {

  @Output() closeEvent = new EventEmitter<number>();

  respFromServer!: TarifaPageInterface;
  usuarioSession!: string; //Por si acaso

  generated!: number;
  generados: boolean = false;
  msg: string = "";

  filter: string = "";
  id_usertypeFilter: number = 0;
  numberOfElements: number = 10;
  page: number = 0;
  sortField: string = "";
  sortDirection: string = "";

  constructor(
    private tarifaService: TarifaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {

    //console.log("localstorage: ",localStorage.getItem("usuario"));

    this.tarifaService.plistTarifa(this.page, this.numberOfElements, this.filter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: TarifaPageInterface) => {
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
    this.filter = term;
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

  setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPage();
  }

  selectTarifa(id: number) {
    this.closeEvent.emit(id);
  }
}
