import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOperationComponent } from './cart-operation.component';

describe('CartOperationComponent', () => {
  let component: CartOperationComponent;
  let fixture: ComponentFixture<CartOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
