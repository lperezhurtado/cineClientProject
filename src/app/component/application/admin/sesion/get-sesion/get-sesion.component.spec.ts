import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSesionComponent } from './get-sesion.component';

describe('GetSesionComponent', () => {
  let component: GetSesionComponent;
  let fixture: ComponentFixture<GetSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
