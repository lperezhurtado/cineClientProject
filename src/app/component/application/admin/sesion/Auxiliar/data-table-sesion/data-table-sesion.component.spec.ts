import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableSesionComponent } from './data-table-sesion.component';

describe('DataTableSesionComponent', () => {
  let component: DataTableSesionComponent;
  let fixture: ComponentFixture<DataTableSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
