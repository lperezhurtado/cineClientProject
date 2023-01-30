import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TarifaInterface } from 'src/app/model/Tarifa-interface';
import { TarifaService } from 'src/app/service/tarifa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-tarifa',
  templateUrl: './update-tarifa.component.html',
  styleUrls: ['./update-tarifa.component.css']
})
export class UpdateTarifaComponent {

  private entityUrl="/genero";
  tarifa!: TarifaInterface;
  url = "";
  id: number;
  form!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private tarifaService: TarifaService,
    private formBuilder: FormBuilder
  ){
    this.id = activatedRoute.snapshot.params['id'];
    this.url = `${environment.baseURL}${this.entityUrl}`;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id:[""],
      nombre:["", [Validators.required]],
      precio:["", [Validators.required]]
    });
      this.getTarifa();
  }

  back() {
    this.location.back();
  }

  getTarifa() {
    this.tarifaService.getTarifa(this.id).subscribe({
      next: (resp: TarifaInterface) => {
        console.log(resp);
        this.form = this.formBuilder.group({
          id:     [resp.id],
          nombre: [resp.nombre],
          precio: [resp.precio]
        });
      }
    });
  }

  updateTarifa() {
    this.tarifa = {
      id: this.form.value.id,
      nombre: this.form.value.nombre,
      precio: this.form.value.precio
    }

    if (this.form.valid) {
      this.tarifaService.updateTarifa(this.tarifa).subscribe({
        next: (resp: number) => {
          console.log(resp);
        }
      });
    }
  }
}
