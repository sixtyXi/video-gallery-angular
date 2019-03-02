import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';

import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';
import * as fromStore from '../../store/reducers';
import * as Courses from '../../courses/actions/courses.actions';
import { DurationFieldComponent } from './duration-field/duration-field.component';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: [ './course-page.component.less' ]
})
export class CoursePageComponent implements OnInit {
  public course$: Observable<VideoRecord>;
  private courseId: string | number;
  public form: FormGroup;
  @ViewChild(DurationFieldComponent) durationField;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.State>,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      title: [ '', [ Validators.required, Validators.maxLength(50) ] ],
      description: [ '', [ Validators.required, Validators.maxLength(500) ] ],
      creationDate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/)
        ]
      ],
      duration: [ '', [ Validators.required, Validators.pattern('[1-9]{1}[0-9]*') ] ]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      if (data.id) {
        this.course$ = this.store.select(fromStore.getCourse).pipe(
          tap((course) => {
            if (course) {
              this.fillForm(course);
              this.courseId = course.id;
            }
          })
        );
        this.course$.subscribe();
      } else {
        this.course$ = null;
        this.courseId = '';
      }
    });
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  get creationDate() {
    return this.form.get('creationDate');
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
    const date = creationDate.toISOString().substring(0, 10);
    controls['creationDate'] = this.datePipe.transform(date, 'dd/MM/yyyy');
    return controls;
  }

  mapToModel(controlValues): Partial<VideoRecord> {
    const { creationDate, ...values } = controlValues;
    const [ day, month, year ] = creationDate.split('/');

    values['creationDate'] = new Date(`${year}-${month}-${day}`);
    return values;
  }
}
