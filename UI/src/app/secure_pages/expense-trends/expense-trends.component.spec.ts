import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTrendsComponent } from './expense-trends.component';

describe('ExpenseTrendsComponent', () => {
  let component: ExpenseTrendsComponent;
  let fixture: ComponentFixture<ExpenseTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
