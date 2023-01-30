import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTarifaComponent } from './create-tarifa.component';

describe('CreateTarifaComponent', () => {
  let component: CreateTarifaComponent;
  let fixture: ComponentFixture<CreateTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTarifaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
