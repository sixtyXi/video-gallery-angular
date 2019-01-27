import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-duration-field',
  templateUrl: './duration-field.component.html',
  styleUrls: [ './duration-field.component.less' ]
})
export class DurationFieldComponent implements OnInit {
  @Input() duration: number;

  constructor() {}

  ngOnInit() {}
}
