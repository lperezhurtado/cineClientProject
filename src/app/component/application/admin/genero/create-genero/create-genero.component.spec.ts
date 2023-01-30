import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGeneroComponent } from './create-genero.component';

describe('CreateGeneroComponent', () => {
  let component: CreateGeneroComponent;
  let fixture: ComponentFixture<CreateGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
