import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TSalaPageInterface } from 'src/app/model/TipoSala-interface';
import { TipoSalaService } from 'src/app/service/tipo-sala.service';

declare let bootstrap: any;

@Component({
  templateUrl: './lista-tiposala.component.html',
  styleUrls: ['./lista-tiposala.component.css']
})
export class ListaTiposalaComponent {

  respFromServer!: TSalaPageInterface;
  tipoSalaSession!: string; //Por si acaso

  generated!: number;
  generados: boolean = false;
  msg: string = "";

  strTermFilter: string = "";
  id_usertypeFilter: number = 0;
  numberOfElements: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDirection: string = "";

  //modals
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private tipoSalaService: TipoSalaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {

    //console.log("localstorage: ",localStorage.getItem("usuario"));

    this.tipoSalaService.plistTipoSala(this.page, this.numberOfElements)
      .subscribe({
        next: (resp: TSalaPageInterface) => {
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

  setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPage();
  }

  aux: number = 0;
  openModalFindTipoSala(id: number): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findTipoSala"), { //pasar el myModal como parametro
      keyboard: false
    });
    this.aux = id;
    this.myModal.show()
  }

  closeTipoSalaModal(id_tiposala: number) {
    this.myModal.hide();
  }
}
