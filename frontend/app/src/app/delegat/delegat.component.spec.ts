import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatComponent } from './delegat.component';

describe('DelegatComponent', () => {
  let component: DelegatComponent;
  let fixture: ComponentFixture<DelegatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
