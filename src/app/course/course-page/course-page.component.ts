import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';
import * as fromStore from '../../store/reducers';
import * as Courses from '../../courses/actions/courses.actions';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: [ './course-page.component.less' ]
})
export class CoursePageComponent implements OnInit {
  public course$: Observable<VideoRecord>;
  private courseId: string | number;
  public form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.State>,
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
    this.course$ = this.store.select(fromStore.getCourse).pipe(
      tap((course) => {
        if (course) {
          this.fillForm(course);
          this.courseId = course.id;
        }
      })
    );
  }

  onSubmit() {
    const controlValues: Partial<VideoRecord> = this.mapToModel(this.form.value);

    if (this.courseId) {
      this.store.dispatch(
        new Courses.CourseUpdateRequested({ courseId: this.courseId, course: { ...controlValues } })
      );
    } else {
      const course: Partial<VideoRecord> = { ...controlValues, topRated: false };

      this.store.dispatch(new Courses.CourseAddRequested({ course }));
    }
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
}
