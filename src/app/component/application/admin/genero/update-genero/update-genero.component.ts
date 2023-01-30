import { GeneroInterface } from './../../../../../model/Genero-interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneroService } from 'src/app/service/genero.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './update-genero.component.html',
  styleUrls: ['./update-genero.component.css']
})
export class UpdateGeneroComponent implements OnInit {

  private entityUrl="/genero";
  genero!: GeneroInterface;
  url = "";
  id: number;
  form!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private generoService: GeneroService,
    private formBuilder: FormBuilder
  ){
    this.id = activatedRoute.snapshot.params['id'];
    this.url = `${environment.baseURL}${this.entityUrl}`;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id:[""],
      nombre:["", [Validators.required]]
    });
      this.getGenero();
  }

  back() {
    this.location.back();
  }

  getGenero() {
    this.generoService.getOne(this.id).subscribe({
      next: (resp: GeneroInterface) => {
        console.log(resp);
        this.form = this.formBuilder.group({
          id:     [resp.id],
          nombre: [resp.nombre],
          count:  [resp.peliculasCount]
        });
      }
    });
  }

  updateGenero() {
    this.genero = {
      id: this.form.value.id,
      nombre: this.form.value.nombre,
      peliculasCount: this.form.value.count
    }

    if (this.form.valid) {
      this.generoService.updateGenero(this.genero).subscribe({
        next: (resp: number) => {
          console.log(resp);
        }
      });
    }
  }
}
