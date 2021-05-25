import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsByClientComponent } from './appointments-by-client.component';

describe('AppointmentsByClientComponent', () => {
  let component: AppointmentsByClientComponent;
  let fixture: ComponentFixture<AppointmentsByClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsByClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
