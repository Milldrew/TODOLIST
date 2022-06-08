import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameOverlayComponent } from './rename-overlay.component';

describe('RenameOverlayComponent', () => {
  let component: RenameOverlayComponent;
  let fixture: ComponentFixture<RenameOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenameOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
