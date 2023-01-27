import { HttpErrorResponse } from '@angular/common/http';
import { GeneroPageInterface } from './../../../../../model/Genero-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneroService } from './../../../../../service/genero.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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

  constructor(
    private generoService: GeneroService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPlist();
  }

  getPlist() {
    this.generoService.plistGenero(this.page, this.size)
    .subscribe({
      next: (resp: GeneroPageInterface) => {
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

  selectGenero(id: number) {
    this.closeEvent.emit(id);
  }

}
