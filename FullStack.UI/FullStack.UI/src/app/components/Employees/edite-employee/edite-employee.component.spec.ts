import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeEmployeeComponent } from './edite-employee.component';

describe('EditeEmployeeComponent', () => {
  let component: EditeEmployeeComponent;
  let fixture: ComponentFixture<EditeEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditeEmployeeComponent]
    });
    fixture = TestBed.createComponent(EditeEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
