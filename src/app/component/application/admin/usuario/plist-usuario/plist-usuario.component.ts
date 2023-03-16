import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioPageInterface } from 'src/app/model/Usuario-interface';
import { UsuarioService } from 'src/app/service/usuario.service';

declare let bootstrap: any;
@Component({
  selector: 'app-admin-plist-usuario',
  templateUrl: './plist-usuario.component.html',
  styleUrls: ['./plist-usuario.component.css']
})
export class PlistUsuarioComponent implements OnInit {

  respFromServer!: UsuarioPageInterface;
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

   //modals
   mimodal: string = "miModal";
   myModal: any;
   modalTitle: string = "";
   modalContent: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    //console.log("localstorage: ",localStorage.getItem("usuario"));

    this.usuarioService.getUsuarioPlist(this.page, this.numberOfElements,
      this.strTermFilter, this.id_usertypeFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: UsuarioPageInterface) => {
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

  setFilterByUsertype(id: number): void {
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

    if(this.sortField != order) {
      let icon = document.getElementById(this.sortField);
      icon?.classList.remove(icon?.classList.value.slice(3));
      icon?.classList.add('pi-sort-alt');
    }
    this.sortField = order;
    this.sortDirection = this.sortDirection == "asc"? "desc" : "asc";

    let icon = document.getElementById(order);
    this.sortDirection == "asc"? icon?.classList.replace(icon?.classList.value.slice(3),'pi-sort-numeric-down') : icon?.classList.replace(icon?.classList.value.slice(3),'pi-sort-numeric-up');

    /*if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
      icon?.classList.replace(icon?.classList.value.slice(3),'pi-sort-numeric-down');
    } else {
      this.sortDirection = "asc";
      icon?.classList.replace(icon?.classList.value.slice(3),'pi-sort-numeric-up');
    }*/
    this.getPage();
  }

  /*showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    });
    var myModalEl = document.getElementById(this.mimodal);
    if (myModalEl) {
       myModalEl.addEventListener('hidden.bs.modal', (event): void => {

      this.router.navigate(['/admin/usuario/view/', this.id])
      });
    }
    this.myModal.show()
  }*/
  id!: number;
  openModalView(id: number): void {
    this.id = id;
    this.myModal = new bootstrap.Modal(document.getElementById('viewUser'), { //pasar el myModal como parametro
      keyboard: false
    });
    this.myModal.show();
  }

  generar(cantidad: number) {
    this.usuarioService.generateUsuario(cantidad).subscribe({
      next: (resp: number) => {
        this.generated = resp;

        this.msg = "Se han generado "+(cantidad)+" usuarios ("+resp+" usuarios en total)" ;

        const myModal = new bootstrap.Modal('#generateInfo', {
          keyboard: false
        })
        myModal.show();
      }
    })
  }
}
