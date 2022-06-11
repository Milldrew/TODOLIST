import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgpComponent } from './ogp.component';

describe('OgpComponent', () => {
  let component: OgpComponent;
  let fixture: ComponentFixture<OgpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
