import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CoursesService } from 'src/app/courses/services/courses.service';
import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';
import * as fromStore from '../../store/reducers/index';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: [ './breadcrumbs.component.less' ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public course: VideoRecord = null;
  public isAuth$: Observable<boolean>;
  private ngUnsubscribe = new Subject();

  constructor(
    private store: Store<fromStore.State>,
    private coursesService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isAuth$ = this.store.select(fromStore.getLoggedIn);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => route.firstChild),
        map((route) => ({ params: route.params, data: route.data }))
      )
      .subscribe((route) => {
        route.params.subscribe((params) => {
          if (params.id) {
            this.coursesService
              .getCourseById(params.id)
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((res: VideoRecord) => {
                this.course = res;
              });
          } else {
            this.course = null;
          }
        });
        //Do something with data
        // route.data.subscribe((data) => {
        // });
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
