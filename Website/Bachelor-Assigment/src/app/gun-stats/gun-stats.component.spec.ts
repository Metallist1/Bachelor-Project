import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GunStatsComponent } from './gun-stats.component';

describe('GunStatsComponent', () => {
  let component: GunStatsComponent;
  let fixture: ComponentFixture<GunStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GunStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GunStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
