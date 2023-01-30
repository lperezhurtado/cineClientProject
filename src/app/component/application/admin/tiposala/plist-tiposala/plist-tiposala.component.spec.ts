import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlistTiposalaComponent } from './plist-tiposala.component';

describe('PlistTiposalaComponent', () => {
  let component: PlistTiposalaComponent;
  let fixture: ComponentFixture<PlistTiposalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistTiposalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlistTiposalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
