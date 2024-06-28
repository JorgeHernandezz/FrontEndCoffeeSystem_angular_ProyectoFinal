import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenresetearComponent } from './tokenresetear.component';

describe('TokenresetearComponent', () => {
  let component: TokenresetearComponent;
  let fixture: ComponentFixture<TokenresetearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenresetearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TokenresetearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
