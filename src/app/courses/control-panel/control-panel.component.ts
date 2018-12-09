import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.less']
})
export class ControlPanelComponent implements OnInit {
  public txtToSearch: string;

  constructor() { }

  ngOnInit() {
  }

  onSearch(): void {
    this.txtToSearch && console.log(this.txtToSearch);
  }
}
