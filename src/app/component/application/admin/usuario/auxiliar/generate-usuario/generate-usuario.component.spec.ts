import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateUsuarioComponent } from './generate-usuario.component';

describe('GenerateUsuarioComponent', () => {
  let component: GenerateUsuarioComponent;
  let fixture: ComponentFixture<GenerateUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
