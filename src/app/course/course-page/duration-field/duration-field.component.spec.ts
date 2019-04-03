import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

import { DurationFieldComponent } from './duration-field.component';
import { FormatDurationPipe } from 'src/app/shared/pipes/format-duration.pipe';

describe('DurationFieldComponent', () => {
  let component: DurationFieldComponent;
  let fixture: ComponentFixture<DurationFieldComponent>;
  const fb: FormBuilder = new FormBuilder();

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ DurationFieldComponent, FormatDurationPipe ],
        imports: [ ReactiveFormsModule ],
        providers: [ { provide: FormBuilder, useValue: fb } ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationFieldComponent);
    component = fixture.componentInstance;
    component.parentForm = fb.group({
      duration: [ '', Validators.required ]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
