import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableUsuarioComponent } from './data-table-usuario.component';

describe('DataTableUsuarioComponent', () => {
  let component: DataTableUsuarioComponent;
  let fixture: ComponentFixture<DataTableUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
