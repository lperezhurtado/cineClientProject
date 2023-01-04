import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUsuarioComponent } from './get-usuario.component';

describe('GetUsuarioComponent', () => {
  let component: GetUsuarioComponent;
  let fixture: ComponentFixture<GetUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
