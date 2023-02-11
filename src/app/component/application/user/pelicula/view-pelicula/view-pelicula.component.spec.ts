import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPeliculaComponent } from './view-pelicula.component';

describe('ViewPeliculaComponent', () => {
  let component: ViewPeliculaComponent;
  let fixture: ComponentFixture<ViewPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
