import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureAppointmetsListComponent } from './future-appointmets-list.component';

describe('FutureAppointmetsListComponent', () => {
  let component: FutureAppointmetsListComponent;
  let fixture: ComponentFixture<FutureAppointmetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureAppointmetsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureAppointmetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
