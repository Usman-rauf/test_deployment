import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProfileSettingsComponent } from './dashboard-profile-settings.component';

describe('DashboardProfileSettingsComponent', () => {
  let component: DashboardProfileSettingsComponent;
  let fixture: ComponentFixture<DashboardProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProfileSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
