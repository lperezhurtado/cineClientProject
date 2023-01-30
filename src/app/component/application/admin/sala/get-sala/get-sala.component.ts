import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaInterface } from 'src/app/model/Sala-interface';
import { SalaService } from 'src/app/service/sala.service';

@Component({
  templateUrl: './get-sala.component.html',
  styleUrls: ['./get-sala.component.css']
})
export class GetSalaComponent implements OnInit {

  id: number = 0;
  sala!: SalaInterface;

  constructor(
    private salaService: SalaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getSala();
  }

  getSala() {
    this.salaService.getSala(this.id).subscribe({
      next: (resp: SalaInterface) => {
        this.sala = resp;
        console.log(this.sala);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['admin/sala/plist']);
  }
}
