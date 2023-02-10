import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewEntradaComponent } from './preview-entrada.component';

describe('PreviewEntradaComponent', () => {
  let component: PreviewEntradaComponent;
  let fixture: ComponentFixture<PreviewEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
