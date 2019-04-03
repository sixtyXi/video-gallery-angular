import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-duration-field',
  templateUrl: './duration-field.component.html',
  styleUrls: [ './duration-field.component.less' ]
})
export class DurationFieldComponent {
  @Input() parentForm: FormGroup;

  constructor() {}

  get duration() {
    return this.parentForm.get('duration');
  }
}
