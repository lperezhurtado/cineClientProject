import { PaginationService } from './../../../../service/pagination.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-unrouted',
  templateUrl: './pagination-unrouted.component.html',
  styleUrls: ['./pagination-unrouted.component.css']
})
export class PaginationUnroutedComponent implements OnInit {

  _nPage: number = 0;
  _nTotalPages: number = 0;
  aPaginationBar!: string[];

  @Input()
  set nPage(value: number) {
    this._nPage = value;
    this.aPaginationBar = this.paginationService.pagination(this._nTotalPages, this._nPage);
  }
  get nPage(): number {
    return this._nPage;
  }

  @Input()
  set nTotalPages(value: number) {
    this._nTotalPages = value;
    this.aPaginationBar = this.paginationService.pagination(this._nTotalPages, this._nPage);
  }
  get nTotalPages(): number {
    return this._nTotalPages;
  }

  @Output() eePage = new EventEmitter<number>();

  constructor(
    private paginationService: PaginationService
  ) { }

  ngOnInit(): void {
  }

  doJumpToPage() {
    this.eePage.emit(this._nPage);
    return false;
  }

}
