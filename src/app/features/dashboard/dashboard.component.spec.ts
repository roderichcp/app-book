import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
    }).compileComponents();
  });

  it('should create the Dashboard', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboardApp = fixture.componentInstance;
    expect(dashboardApp).toBeTruthy();
  });
});