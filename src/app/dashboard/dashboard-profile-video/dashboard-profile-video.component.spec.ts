import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProfileVideoComponent } from './dashboard-profile-video.component';

describe('DashboardProfileVideoComponent', () => {
  let component: DashboardProfileVideoComponent;
  let fixture: ComponentFixture<DashboardProfileVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProfileVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProfileVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
