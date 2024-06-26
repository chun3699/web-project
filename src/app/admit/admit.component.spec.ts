import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitComponent } from './admit.component';

describe('AdmitComponent', () => {
  let component: AdmitComponent;
  let fixture: ComponentFixture<AdmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
