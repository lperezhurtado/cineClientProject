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
  size: number = 5;
  totalPages!: number;

  constructor(
    private tarifaService: TarifaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPlist();
  }

  getPlist() {
    this.tarifaService.plistTarifa(this.page, this.size)
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
    this.getPlist();
  }

  selectTarifa(id: number) {
    this.closeEvent.emit(id);
  }
}
