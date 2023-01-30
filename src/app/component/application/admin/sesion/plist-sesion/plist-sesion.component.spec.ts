import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlistSesionComponent } from './plist-sesion.component';

describe('PlistSesionComponent', () => {
  let component: PlistSesionComponent;
  let fixture: ComponentFixture<PlistSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlistSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
