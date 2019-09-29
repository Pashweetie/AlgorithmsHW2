import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreePredictorComponent } from './tree-predictor.component';

describe('TreePredictorComponent', () => {
  let component: TreePredictorComponent;
  let fixture: ComponentFixture<TreePredictorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreePredictorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreePredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
