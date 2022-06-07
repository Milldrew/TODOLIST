import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListOverlayComponent } from './add-list-overlay.component';

describe('AddListOverlayComponent', () => {
  let component: AddListOverlayComponent;
  let fixture: ComponentFixture<AddListOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddListOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
