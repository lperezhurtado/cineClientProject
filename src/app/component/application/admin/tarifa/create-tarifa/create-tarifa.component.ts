import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TarifaInterface } from 'src/app/model/Tarifa-interface';
import { TarifaService } from 'src/app/service/tarifa.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-tarifa',
  templateUrl: './create-tarifa.component.html',
  styleUrls: ['./create-tarifa.component.css']
})
export class CreateTarifaComponent {

  tarifa!: TarifaInterface;
  private entityUrl:string =  "/tarifa";
  url = "";
  id!: number;
  form!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tarifaService: TarifaService,
    private location: Location
  ) {
    this.url = `${environment.baseURL}${this.entityUrl}`;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id:[""],
      nombre:["", [Validators.required]],
      precio:["", [Validators.required]]
    });
  }

  back() {
    this.location.back();
  }

  createTarifa() {
    this.tarifa = {
      id: this.form.value.id,
      nombre: this.form.value.nombre,
      precio: this.form.value.precio
    }

    if (this.form.valid) {
      this.tarifaService.createTarifa(this.tarifa).subscribe({
        next: (resp: number) => {
          this.id = resp;
          console.log(this.id);
        }
      })
    }
  }

}
