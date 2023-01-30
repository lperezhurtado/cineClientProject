import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTiposalaComponent } from './update-tiposala.component';

describe('UpdateTiposalaComponent', () => {
  let component: UpdateTiposalaComponent;
  let fixture: ComponentFixture<UpdateTiposalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTiposalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTiposalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
