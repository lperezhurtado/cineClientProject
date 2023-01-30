import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlistSalaComponent } from './plist-sala.component';

describe('PlistSalaComponent', () => {
  let component: PlistSalaComponent;
  let fixture: ComponentFixture<PlistSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistSalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlistSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
