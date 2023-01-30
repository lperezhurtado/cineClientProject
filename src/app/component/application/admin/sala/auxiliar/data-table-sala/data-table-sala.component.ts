import { SalaInterface } from 'src/app/model/Sala-interface';
import { Component, OnInit, Input } from '@angular/core';
import { SalaService } from 'src/app/service/sala.service';

@Component({
  selector: 'app-data-table-sala',
  templateUrl: './data-table-sala.component.html',
  styleUrls: ['./data-table-sala.component.css']
})
export class DataTableSalaComponent implements OnInit{

  @Input() id!: number;
  sala!: SalaInterface;

  constructor(
    private salaService: SalaService
  ) { }

  ngOnInit(): void {
    this.getSala();
  }

  getSala() {
    this.salaService.getSala(this.id).subscribe({
      next: (resp: SalaInterface) => {
        this.sala = resp;
      }
    });
  }
}
