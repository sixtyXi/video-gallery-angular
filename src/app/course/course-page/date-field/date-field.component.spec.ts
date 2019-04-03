import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { DateFieldComponent } from './date-field.component';

describe('DateFieldComponent', () => {
  let component: DateFieldComponent;
  let fixture: ComponentFixture<DateFieldComponent>;
  const fb: FormBuilder = new FormBuilder();

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ DateFieldComponent ],
        imports: [ ReactiveFormsModule ],
        providers: [ { provide: FormBuilder, useValue: fb } ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFieldComponent);
    component = fixture.componentInstance;
    component.parentForm = fb.group({
      creationDate: [ '', Validators.required ]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
