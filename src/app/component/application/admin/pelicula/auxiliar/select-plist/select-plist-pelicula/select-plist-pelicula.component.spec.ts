import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlistPeliculaComponent } from './select-plist-pelicula.component';

describe('SelectPlistPeliculaComponent', () => {
  let component: SelectPlistPeliculaComponent;
  let fixture: ComponentFixture<SelectPlistPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPlistPeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPlistPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
