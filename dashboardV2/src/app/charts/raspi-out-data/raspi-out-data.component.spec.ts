import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspiOutDataComponent } from './raspi-out-data.component';

describe('RaspiOutDataComponent', () => {
  let component: RaspiOutDataComponent;
  let fixture: ComponentFixture<RaspiOutDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaspiOutDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaspiOutDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
