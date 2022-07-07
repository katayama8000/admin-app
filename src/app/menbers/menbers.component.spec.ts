import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenbersComponent } from './menbers.component';

describe('MenbersComponent', () => {
  let component: MenbersComponent;
  let fixture: ComponentFixture<MenbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenbersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
