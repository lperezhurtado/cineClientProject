import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSalaComponent } from './get-sala.component';

describe('GetSalaComponent', () => {
  let component: GetSalaComponent;
  let fixture: ComponentFixture<GetSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
