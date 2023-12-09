import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PenaltyPage } from './penalty.page';

describe('PenaltyPage', () => {
  let component: PenaltyPage;
  let fixture: ComponentFixture<PenaltyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PenaltyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
