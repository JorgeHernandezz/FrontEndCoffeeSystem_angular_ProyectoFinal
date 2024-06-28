import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokencrearComponent } from './tokencrear.component';

describe('TokencrearComponent', () => {
  let component: TokencrearComponent;
  let fixture: ComponentFixture<TokencrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokencrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TokencrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
