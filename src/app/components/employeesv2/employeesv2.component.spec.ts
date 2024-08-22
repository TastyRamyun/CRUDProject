import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeesv2Component } from './employeesv2.component';

describe('Employeesv2Component', () => {
  let component: Employeesv2Component;
  let fixture: ComponentFixture<Employeesv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Employeesv2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employeesv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
