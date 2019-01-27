import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: [ './date-field.component.less' ]
})
export class DateFieldComponent implements OnInit {
  @Input() dateValue: Date;

  constructor() {}

  ngOnInit() {}
}
