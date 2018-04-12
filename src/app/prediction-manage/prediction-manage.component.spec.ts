import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionManageComponent } from './prediction-manage.component';

describe('PredictionManageComponent', () => {
  let component: PredictionManageComponent;
  let fixture: ComponentFixture<PredictionManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
