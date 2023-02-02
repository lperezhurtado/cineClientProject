import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTiposalaComponent } from './get-tiposala.component';

describe('GetTiposalaComponent', () => {
  let component: GetTiposalaComponent;
  let fixture: ComponentFixture<GetTiposalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTiposalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTiposalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
