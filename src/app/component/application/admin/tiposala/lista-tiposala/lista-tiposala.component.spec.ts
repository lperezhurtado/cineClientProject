import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiposalaComponent } from './lista-tiposala.component';

describe('ListaTiposalaComponent', () => {
  let component: ListaTiposalaComponent;
  let fixture: ComponentFixture<ListaTiposalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTiposalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTiposalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
