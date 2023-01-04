import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlistTipousuarioComponent } from './plist-tipousuario.component';

describe('PlistTipousuarioComponent', () => {
  let component: PlistTipousuarioComponent;
  let fixture: ComponentFixture<PlistTipousuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistTipousuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlistTipousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
