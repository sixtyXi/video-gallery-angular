import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: [ './date-field.component.less' ]
})
export class DateFieldComponent implements OnInit {
  @Input() parentForm: FormGroup;

  constructor() {}

  ngOnInit() {}

  get date() {
    return this.parentForm.get('creationDate');
  }
}
