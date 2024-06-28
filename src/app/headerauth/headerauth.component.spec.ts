import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderauthComponent } from './headerauth.component';

describe('HeaderauthComponent', () => {
  let component: HeaderauthComponent;
  let fixture: ComponentFixture<HeaderauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderauthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
