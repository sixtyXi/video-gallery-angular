import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.less']
})
export class ControlPanelComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  public txtToSearch: string = '';

  constructor() { }

  ngOnInit() {
  }

  onSearch(): void {
    this.search.emit(this.txtToSearch);
  }
}
