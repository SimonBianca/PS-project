import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsByDatesComponent } from './appointments-by-dates.component';

describe('AppointmentsByDatesComponent', () => {
  let component: AppointmentsByDatesComponent;
  let fixture: ComponentFixture<AppointmentsByDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsByDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsByDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
