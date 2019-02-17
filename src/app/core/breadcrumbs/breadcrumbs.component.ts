import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: [ './breadcrumbs.component.less' ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public course: VideoRecord = null;

  private ngUnsubscribe = new Subject();

  constructor(
    public authService: AuthService,
    private coursesService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
