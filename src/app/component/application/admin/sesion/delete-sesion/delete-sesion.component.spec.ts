import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSesionComponent } from './delete-sesion.component';

describe('DeleteSesionComponent', () => {
  let component: DeleteSesionComponent;
  let fixture: ComponentFixture<DeleteSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
