import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalMapPage } from './modal-map.page';

describe('ModalMapPage', () => {
  let component: ModalMapPage;
  let fixture: ComponentFixture<ModalMapPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
