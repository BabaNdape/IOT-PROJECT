import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitiotDataComponent } from './fitiot-data.component';

describe('FitiotDataComponent', () => {
  let component: FitiotDataComponent;
  let fixture: ComponentFixture<FitiotDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitiotDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitiotDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
