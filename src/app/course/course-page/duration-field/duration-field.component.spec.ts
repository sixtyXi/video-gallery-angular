import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationFieldComponent } from './duration-field.component';
import { FormatDurationPipe } from 'src/app/shared/pipes/format-duration.pipe';

describe('DurationFieldComponent', () => {
  let component: DurationFieldComponent;
  let fixture: ComponentFixture<DurationFieldComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ DurationFieldComponent, FormatDurationPipe ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
