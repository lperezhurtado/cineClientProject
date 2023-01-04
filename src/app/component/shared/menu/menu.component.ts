
import { LoginService } from './../../../service/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { UsuarioInterface } from './../../../model/Usuario-interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: UsuarioInterface;
  strUrl: String = "";

  constructor(
    private router: Router,
  ) {
    //ALTERNATIVA
    /*const storage = localStorage.getItem('usuario');
    this.usuario = storage? JSON.parse( localStorage.getItem("user") || "[]") : null;*/

    this.usuario =  JSON.parse( localStorage.getItem("usuario")! ); //tambien se puede usar la exclamacion en vez de || "[]"
    //console.log("menu component",this.usuario);

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    });
  }

  ngOnInit(): void {
  }

}
