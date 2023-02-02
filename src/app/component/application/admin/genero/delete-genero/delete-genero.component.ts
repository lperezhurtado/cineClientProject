import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneroInterface } from 'src/app/model/Genero-interface';
import { GeneroService } from 'src/app/service/genero.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

declare let bootstrap: any;

@Component({
  templateUrl: './delete-genero.component.html',
  styleUrls: ['./delete-genero.component.css']
})
export class DeleteGeneroComponent implements OnInit {

  genero!: GeneroInterface;
  id: number;
  msg: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private generoService: GeneroService,
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getGenero();
  }

  back() {
    this.location.back();
  }

  getGenero() {
    this.generoService.getOne(this.id).subscribe({
      next: (resp: GeneroInterface) => {
        console.log(resp);
        this.genero = resp;
      }
    });
  }

  deleteGenero(id: number){
    this.generoService.deleteGenero(id).subscribe({
      next: (resp: number) => {
        console.log(resp);
        this.msg = "Género " + this.id + " eliminado";
        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })

        myModal.show();
        this.location.back();
      }
    });
  }
}
