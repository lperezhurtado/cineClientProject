import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePeliculaComponent } from './create-pelicula.component';

describe('CreatePeliculaComponent', () => {
  let component: CreatePeliculaComponent;
  let fixture: ComponentFixture<CreatePeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
