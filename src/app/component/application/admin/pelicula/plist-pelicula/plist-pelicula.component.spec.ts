import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlistPeliculaComponent } from './plist-pelicula.component';

describe('PlistPeliculaComponent', () => {
  let component: PlistPeliculaComponent;
  let fixture: ComponentFixture<PlistPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistPeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlistPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
