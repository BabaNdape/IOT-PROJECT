import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspiInDataComponent } from './raspi-in-data.component';

describe('RaspiInDataComponent', () => {
  let component: RaspiInDataComponent;
  let fixture: ComponentFixture<RaspiInDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaspiInDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaspiInDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
