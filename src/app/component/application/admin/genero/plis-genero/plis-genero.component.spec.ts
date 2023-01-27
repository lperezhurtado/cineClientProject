import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlisGeneroComponent } from './plis-genero.component';

describe('PlisGeneroComponent', () => {
  let component: PlisGeneroComponent;
  let fixture: ComponentFixture<PlisGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlisGeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlisGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
