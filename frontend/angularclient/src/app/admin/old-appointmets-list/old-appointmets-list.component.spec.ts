import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldAppointmetsListComponent } from './old-appointmets-list.component';

describe('OldAppointmetsListComponent', () => {
  let component: OldAppointmetsListComponent;
  let fixture: ComponentFixture<OldAppointmetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldAppointmetsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldAppointmetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
