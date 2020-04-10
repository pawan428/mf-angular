import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDoughnutComponent } from './portfolio-doughnut.component';

describe('PortfolioDoughnutComponent', () => {
  let component: PortfolioDoughnutComponent;
  let fixture: ComponentFixture<PortfolioDoughnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioDoughnutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
