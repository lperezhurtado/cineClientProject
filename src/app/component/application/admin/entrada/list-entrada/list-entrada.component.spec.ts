import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntradaComponent } from './list-entrada.component';

describe('ListEntradaComponent', () => {
  let component: ListEntradaComponent;
  let fixture: ComponentFixture<ListEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
