import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePeliculaComponent } from './delete-pelicula.component';

describe('DeletePeliculaComponent', () => {
  let component: DeletePeliculaComponent;
  let fixture: ComponentFixture<DeletePeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
