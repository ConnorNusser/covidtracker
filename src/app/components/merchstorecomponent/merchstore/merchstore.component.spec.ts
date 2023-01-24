import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchstoreComponent } from './merchstore.component';

describe('MerchstoreComponent', () => {
  let component: MerchstoreComponent;
  let fixture: ComponentFixture<MerchstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
