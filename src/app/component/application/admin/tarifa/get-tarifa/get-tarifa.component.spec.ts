import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTarifaComponent } from './get-tarifa.component';

describe('GetTarifaComponent', () => {
  let component: GetTarifaComponent;
  let fixture: ComponentFixture<GetTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTarifaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
