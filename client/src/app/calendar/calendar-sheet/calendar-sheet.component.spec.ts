import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSheetComponent } from './calendar-sheet.component';

describe('CalendarSheetComponent', () => {
  let component: CalendarSheetComponent;
  let fixture: ComponentFixture<CalendarSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
