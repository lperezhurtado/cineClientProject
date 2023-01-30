import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableSalaComponent } from './data-table-sala.component';

describe('DataTableSalaComponent', () => {
  let component: DataTableSalaComponent;
  let fixture: ComponentFixture<DataTableSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableSalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
