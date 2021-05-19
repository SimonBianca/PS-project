import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnWaitingAppointmentsListComponent } from './on-waiting-appointments-list.component';

describe('OnWaitingAppointmentsListComponent', () => {
  let component: OnWaitingAppointmentsListComponent;
  let fixture: ComponentFixture<OnWaitingAppointmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnWaitingAppointmentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnWaitingAppointmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
