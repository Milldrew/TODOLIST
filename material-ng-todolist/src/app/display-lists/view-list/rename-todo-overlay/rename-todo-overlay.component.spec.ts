import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameTodoOverlayComponent } from './rename-todo-overlay.component';

describe('RenameTodoOverlayComponent', () => {
  let component: RenameTodoOverlayComponent;
  let fixture: ComponentFixture<RenameTodoOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenameTodoOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameTodoOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
