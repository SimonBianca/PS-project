import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnWaitingAppointmentsComponent } from './on-waiting-appointments.component';

describe('OnWaitingAppointmentsComponent', () => {
  let component: OnWaitingAppointmentsComponent;
  let fixture: ComponentFixture<OnWaitingAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnWaitingAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnWaitingAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
