import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSesionPeliculaComponent } from './get-sesion-pelicula.component';

describe('GetSesionPeliculaComponent', () => {
  let component: GetSesionPeliculaComponent;
  let fixture: ComponentFixture<GetSesionPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSesionPeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSesionPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
