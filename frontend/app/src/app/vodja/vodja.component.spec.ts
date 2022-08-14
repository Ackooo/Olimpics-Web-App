import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodjaComponent } from './vodja.component';

describe('VodjaComponent', () => {
  let component: VodjaComponent;
  let fixture: ComponentFixture<VodjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
