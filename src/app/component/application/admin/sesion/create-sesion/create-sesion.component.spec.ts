import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSesionComponent } from './create-sesion.component';

describe('CreateSesionComponent', () => {
  let component: CreateSesionComponent;
  let fixture: ComponentFixture<CreateSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
