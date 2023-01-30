import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlistTarifaComponent } from './plist-tarifa.component';

describe('PlistTarifaComponent', () => {
  let component: PlistTarifaComponent;
  let fixture: ComponentFixture<PlistTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistTarifaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlistTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
