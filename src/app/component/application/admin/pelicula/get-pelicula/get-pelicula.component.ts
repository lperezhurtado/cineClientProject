import { PeliculaService } from './../../../../../service/pelicula.service';
import { PeliculaInterface } from './../../../../../model/Pelicula-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './get-pelicula.component.html',
  styleUrls: ['./get-pelicula.component.css']
})
export class GetPeliculaComponent implements OnInit {

  id: number = 0;
  pelicula!: PeliculaInterface;
  private entityUrl="/pelicula"
  url = "";
  src!:string;

  constructor(
    private peliculaService: PeliculaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.url = `${environment.baseURL}${this.entityUrl}`;
  }

  ngOnInit(): void {
    this.getPelicula();
  }

  getPelicula() {
    this.peliculaService.getPelicula(this.id).subscribe({
      next: (resp: PeliculaInterface) => {
        this.pelicula = resp;
        this.src = this.getURLimage(resp.imagen);
        console.log(resp.imagen);
      }
    });
  }

  getURLimage(images: string): string{
    let result =this.url +'/images/'+images;
    return result;
  }

  goBack(): void {
    this.router.navigate(['admin/pelicula/plist']);
  }

}
