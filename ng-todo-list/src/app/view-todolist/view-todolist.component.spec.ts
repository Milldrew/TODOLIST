import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodolistComponent } from './view-todolist.component';

describe('ViewTodolistComponent', () => {
  let component: ViewTodolistComponent;
  let fixture: ComponentFixture<ViewTodolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
