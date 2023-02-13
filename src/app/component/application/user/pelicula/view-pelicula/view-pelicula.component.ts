import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaInterface } from 'src/app/model/Pelicula-interface';
import { PeliculaService } from 'src/app/service/pelicula.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './view-pelicula.component.html',
  styleUrls: ['./view-pelicula.component.css']
})
export class ViewPeliculaComponent implements OnInit{

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
