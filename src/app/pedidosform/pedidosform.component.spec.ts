import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosformComponent } from './pedidosform.component';

describe('PedidosformComponent', () => {
  let component: PedidosformComponent;
  let fixture: ComponentFixture<PedidosformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
