import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.less']
})
export class ControlPanelComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  public txtToSearch: string = '';

  constructor() { }

  ngOnInit() {
  }

  search(): void {
    this.onSearch.emit(this.txtToSearch);
  }
}
