import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGeneroComponent } from './delete-genero.component';

describe('DeleteGeneroComponent', () => {
  let component: DeleteGeneroComponent;
  let fixture: ComponentFixture<DeleteGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
