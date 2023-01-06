import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoUsuarioInterface, TipoUsuarioResponse } from 'src/app/model/TipoUsuario-interface';
import { TipoUsuarioService } from 'src/app/service/tipo-usuario.service';

@Component({
  selector: 'app-tipousuario-plist',
  templateUrl: './plist-tipousuario.component.html',
  styleUrls: ['./plist-tipousuario.component.css']
})
export class PlistTipousuarioComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<number>();

  constructor(
    private tipousuarioService: TipoUsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  private pListContent!: TipoUsuarioInterface[];
  private pagesCount!: number;
  private numberPage : number= 0;
  private pageRegister: number = 5;

  ngOnInit(): void {
    this.getPlist();
  }

  getPlist(){
    this.tipousuarioService.getUsersTypePlist(this.numberPage, this.pageRegister)
    .subscribe({
      next: (resp : TipoUsuarioResponse) =>{
        this.pListContent = resp.content;
        this.pagesCount = resp.totalPages;
      },
      error: (err: HttpErrorResponse) =>{
        console.log(err);
      }
    });
  }

  getPlistContent(): TipoUsuarioInterface[]{
    return this.pListContent;
  }

  getpagesCount(): number{
    return this.pagesCount;
  }

  getNumberPage( e: number ){
    this.numberPage = e;
    this.getPlist();
  }

  getPageRegister():number{
    return this.pageRegister;
  }

  setPageRegister( registerPage: number ){
    this.pageRegister = registerPage;
    this.getPlist();
  }

  selectionUsertype(id: number): void {
    this.closeEvent.emit(id);
  }

}
