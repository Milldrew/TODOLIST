import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoOverlayComponent } from './add-todo-overlay.component';

describe('AddTodoOverlayComponent', () => {
  let component: AddTodoOverlayComponent;
  let fixture: ComponentFixture<AddTodoOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTodoOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
