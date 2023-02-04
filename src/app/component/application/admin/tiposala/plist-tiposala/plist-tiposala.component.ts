import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TSalaPageInterface } from 'src/app/model/TipoSala-interface';
import { TipoSalaService } from 'src/app/service/tipo-sala.service';

@Component({
  selector:'app-tiposala-plist',
  templateUrl: './plist-tiposala.component.html',
  styleUrls: ['./plist-tiposala.component.css']
})
export class PlistTiposalaComponent implements OnInit{

  @Output() closeEvent = new EventEmitter<number>();

  filter: string = "";
  respFromServer!: TSalaPageInterface;
  page: number = 0;
  size: number = 5;
  totalPages!: number;
  sortField: string = "";
  sortDirection: string = "";

  constructor(
    private tipoSalaService: TipoSalaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.getPlist();
  }

  getPlist() {
    this.tipoSalaService.plistTipoSala(this.page, this.size, this.filter, this.sortField, this.sortDirection)
    .subscribe({
      next: (resp: TSalaPageInterface) => {
        this.respFromServer = resp;
        this.totalPages = resp.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  setPage(page: number) {
    this.page = page;
    this.getPlist();
  }

  setRpp(rpp: number) {
    this.size = rpp;
    this.page = 0;
    this.getPlist();
  }

  setFilter(term: string): void {
    this.filter = term;
    this.getPlist();
  }

  setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPlist();
  }

  selectTipoSala(id: number) {
    this.closeEvent.emit(id);
  }
}
