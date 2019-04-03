import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalLoaderService } from '../global-loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: [ './global-loader.component.less' ]
})
export class GlobalLoaderComponent implements OnInit, OnDestroy {
  public isShow = false;
  private ngUnsubscribe = new Subject();

  constructor(private globalLoaderService: GlobalLoaderService) {}

  ngOnInit() {
    this.globalLoaderService.isLoading
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isShow) => (this.isShow = isShow));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
