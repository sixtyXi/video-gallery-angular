import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RoutesRecognized } from '@angular/router';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: [ './breadcrumbs.component.less' ]
})
export class BreadcrumbsComponent implements OnInit {
  public course: VideoRecord = null;

  constructor(
    public authService: AuthService,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        const id = data.state.root.firstChild.params.id;

        if (id) {
          this.course = this.coursesService.getCourseById(+id);
        } else {
          this.course = null;
        }
      }
    });
  }
}
