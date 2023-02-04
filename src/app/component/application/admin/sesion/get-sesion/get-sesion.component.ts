import { SesionService } from 'src/app/service/sesion.service';
import { SesionInterface } from './../../../../../model/Sesion-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-get-sesion',
  templateUrl: './get-sesion.component.html',
  styleUrls: ['./get-sesion.component.css']
})
export class GetSesionComponent implements OnInit {

  id: number = 0;
  sesion!: SesionInterface;
  imagen: string = "";
  private entityUrl="/pelicula"
  url:string="";

  constructor(
    private sesionService: SesionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.url = `${environment.baseURL}${this.entityUrl}`;
  }

  ngOnInit(): void {
    this.getSesion();
  }

  getSesion() {
    this.sesionService.getSesion(this.id).subscribe({
      next: (resp: SesionInterface) => {
        this.sesion = resp;
        this.imagen = resp.pelicula.imagen;
        console.log(resp);
      }
    });
  }

  getURLimage(images: string): string{
    let result =this.url +'/images/'+images;
    return result;
  }

  goBack(): void {
    this.router.navigate(['admin/sesion/plist']);
  }
}
