import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTiposalaComponent } from './delete-tiposala.component';

describe('DeleteTiposalaComponent', () => {
  let component: DeleteTiposalaComponent;
  let fixture: ComponentFixture<DeleteTiposalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTiposalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTiposalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
