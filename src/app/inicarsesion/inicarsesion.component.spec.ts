import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicarsesionComponent } from './inicarsesion.component';

describe('InicarsesionComponent', () => {
  let component: InicarsesionComponent;
  let fixture: ComponentFixture<InicarsesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicarsesionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicarsesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
