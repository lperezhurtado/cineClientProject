import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TarifaPageInterface } from 'src/app/model/Tarifa-interface';
import { TarifaService } from 'src/app/service/tarifa.service';

@Component({
  selector:'app-tarifa-plist',
  templateUrl: './plist-tarifa.component.html',
  styleUrls: ['./plist-tarifa.component.css']
})
export class PlistTarifaComponent {

  @Output() closeEvent = new EventEmitter<number>();
  respFromServer!: TarifaPageInterface;
  page: number = 0;
  size: number = 10;
  totalPages!: number;
  sortField: string = "";
  sortDirection: string = "";
  filter: string = "";

  constructor(
    private tarifaService: TarifaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  back() {
    this.router.navigate(['admin/sesion/plist'])
  }

  getPage() {
    this.tarifaService.plistTarifa(this.page, this.size, this.filter, this.sortField, this.sortDirection)
    .subscribe({
      next: (resp: TarifaPageInterface) => {
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
    this.getPage();
  }

  setRpp(rpp: number) {
    this.size = rpp;
    this.page = 0;
    this.getPage();
  }

  setFilter(term: string): void {
    this.filter = term;
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
}
