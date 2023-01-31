import { SesionService } from 'src/app/service/sesion.service';
import { SesionInterface } from './../../../../../model/Sesion-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-sesion',
  templateUrl: './get-sesion.component.html',
  styleUrls: ['./get-sesion.component.css']
})
export class GetSesionComponent implements OnInit {

  id: number = 0;
  sesion!: SesionInterface;

  constructor(
    private sesionService: SesionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getSesion();
  }

  getSesion() {
    this.sesionService.getSesion(this.id).subscribe({
      next: (resp: SesionInterface) => {
        this.sesion = resp;
        console.log(resp);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['admin/sesion/plist']);
  }
}
