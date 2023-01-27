import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPeliculaComponent } from './get-pelicula.component';

describe('GetPeliculaComponent', () => {
  let component: GetPeliculaComponent;
  let fixture: ComponentFixture<GetPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
