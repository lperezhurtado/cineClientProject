import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalaComponent } from './delete-sala.component';

describe('DeleteSalaComponent', () => {
  let component: DeleteSalaComponent;
  let fixture: ComponentFixture<DeleteSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
