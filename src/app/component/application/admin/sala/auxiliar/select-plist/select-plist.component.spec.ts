import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlistComponent } from './select-plist.component';

describe('SelectPlistComponent', () => {
  let component: SelectPlistComponent;
  let fixture: ComponentFixture<SelectPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
