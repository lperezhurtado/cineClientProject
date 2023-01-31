import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlistTarifaComponent } from './select-plist-tarifa.component';

describe('SelectPlistTarifaComponent', () => {
  let component: SelectPlistTarifaComponent;
  let fixture: ComponentFixture<SelectPlistTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPlistTarifaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPlistTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
