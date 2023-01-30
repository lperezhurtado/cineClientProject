import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTiposalaComponent } from './create-tiposala.component';

describe('CreateTiposalaComponent', () => {
  let component: CreateTiposalaComponent;
  let fixture: ComponentFixture<CreateTiposalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTiposalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTiposalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
