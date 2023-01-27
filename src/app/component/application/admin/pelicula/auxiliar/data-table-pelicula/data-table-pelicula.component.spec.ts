import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablePeliculaComponent } from './data-table-pelicula.component';

describe('DataTablePeliculaComponent', () => {
  let component: DataTablePeliculaComponent;
  let fixture: ComponentFixture<DataTablePeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTablePeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTablePeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
