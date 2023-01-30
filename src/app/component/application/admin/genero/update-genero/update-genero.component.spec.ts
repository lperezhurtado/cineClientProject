import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGeneroComponent } from './update-genero.component';

describe('UpdateGeneroComponent', () => {
  let component: UpdateGeneroComponent;
  let fixture: ComponentFixture<UpdateGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
