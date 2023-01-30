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
  respFromServer!: TSalaPageInterface;
  page: number = 0;
  size: number = 5;
  totalPages!: number;

  constructor(
    private tipoSalaService: TipoSalaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.getPlist();
  }

  getPlist() {
    this.tipoSalaService.plistTipoSala(this.page, this.size)
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

  selectTipoSala(id: number) {
    this.closeEvent.emit(id);
  }
}
