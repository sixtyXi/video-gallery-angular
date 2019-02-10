import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-duration-field',
  templateUrl: './duration-field.component.html',
  styleUrls: [ './duration-field.component.less' ]
})
export class DurationFieldComponent implements OnInit {
  @Input() parentForm: FormGroup;

  constructor() {}

  ngOnInit() {}
}
