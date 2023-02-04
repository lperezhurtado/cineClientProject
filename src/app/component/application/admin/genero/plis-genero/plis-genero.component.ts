import { HttpErrorResponse } from '@angular/common/http';
import { GeneroPageInterface } from './../../../../../model/Genero-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneroService } from './../../../../../service/genero.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector:'app-genero-plist',
  templateUrl: './plis-genero.component.html',
  styleUrls: ['./plis-genero.component.css']
})
export class PlisGeneroComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<number>();
  respFromServer!: GeneroPageInterface;
  page: number = 0;
  size: number = 5;
  totalPages!: number;
  Rpp: number = 5;
  sortField: string = "";
  sortDirection: string = "";
  filter: string = "";

  constructor(
    private generoService: GeneroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlist();
  }

  back() {
    this.location.back();
  }

  getPlist() {
    this.generoService.plistGenero(this.page, this.size, this.filter, this.sortField, this.sortDirection)
    .subscribe({
      next: (resp: GeneroPageInterface) => {
        this.respFromServer = resp;
        //this.totalPages = resp.totalPages;
        if (this.page > resp.totalPages - 1) {
          this.page = resp.totalPages - 1;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.getPlist();
  }

  setRpp(rpp: number) {
    this.size = rpp;
    this.page = 0;
    this.getPlist();
  }

  setPage(page: number) {
    this.page = (page-1);
    this.getPlist();
  }

  selectGenero(id: number) {
    this.closeEvent.emit(id);
  }

}
