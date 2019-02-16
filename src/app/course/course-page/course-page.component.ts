import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: [ './course-page.component.less' ]
})
export class CoursePageComponent implements OnInit, OnDestroy {
  public course: VideoRecord;
  public form: FormGroup;
  private ngUnsubscribe = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [ '', Validators.required ],
      description: [ '', Validators.required ],
      creationDate: [ '', Validators.required ],
      duration: [ '', Validators.required ]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      if (data.id) {
        this.coursesService
          .getCourseById(data.id)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((res: VideoRecord) => {
            this.course = res;
            this.fillForm(this.course);
          });
      }
    });
  }

  onSubmit() {
    const controlValues: Partial<VideoRecord> = this.mapToModel(this.form.value);

    if (this.course) {
      const updatedCourse: VideoRecord = { ...this.course, ...controlValues };

      this.coursesService
        .updateCourse(updatedCourse)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res: VideoRecord) => {
          this.course = res;
        });
    } else {
      const newCourse: Partial<VideoRecord> = { ...controlValues, topRated: false };

      this.coursesService
        .addCourse(newCourse)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res: VideoRecord) => {
          this.course = res;
        });
    }

    this.router.navigate([ 'courses' ]);
  }

  onCancel() {
    this.router.navigate([ 'courses' ]);
  }

  private fillForm(course: VideoRecord) {
    const controlValues = this.mapToControls(course);

    this.form.setValue(controlValues);
  }

  mapToControls(course: VideoRecord): object {
    let { id, topRated, creationDate, ...controls } = course;

    controls['creationDate'] = creationDate.toISOString().substring(0, 10);
    return controls;
  }

  mapToModel(controlValues): Partial<VideoRecord> {
    const { creationDate, ...values } = controlValues;

    values['creationDate'] = new Date(creationDate);
    return values;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
