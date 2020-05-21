import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymethodComponent } from './edit-paymethod.component';

describe('EditPaymethodComponent', () => {
  let component: EditPaymethodComponent;
  let fixture: ComponentFixture<EditPaymethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaymethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
