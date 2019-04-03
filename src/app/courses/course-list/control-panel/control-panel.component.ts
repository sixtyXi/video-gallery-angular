import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, debounceTime } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: [ './control-panel.component.less' ]
})
export class ControlPanelComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  public searchField: FormControl;

  constructor(public translate: TranslateService) {
    this.searchField = new FormControl();
  }

  ngOnInit() {
    this.searchField.valueChanges
      .pipe(filter((txt) => txt.length > 3), debounceTime(500))
      .subscribe((txt) => this.search(txt));
  }

  search(txt): void {
    this.onSearch.emit(txt);
  }
}
