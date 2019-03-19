import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';

import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';
import * as fromStore from '../../store/reducers';
import * as Courses from '../../courses/actions/courses.actions';
import { AuthorsService } from '../services/authors.service';
import { Author } from 'src/app/shared/models/Author.model';
import { AuthorDTO } from 'src/app/shared/models/AuthorDTO.interface';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: [ './course-page.component.less' ]
})
export class CoursePageComponent implements OnInit, OnDestroy {
  public course$: Observable<VideoRecord>;
  private courseId: string | number;
  public form: FormGroup;
  public authors: Author[] = [];
  public selectedAuthors: Author[] = [];
  private ngUnsubscribe = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.State>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private authorsService: AuthorsService
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
      if (data.id !== 'new') {
        this.course$ = this.store.select(fromStore.getCourse).pipe(
          tap((course) => {
            if (course) {
              this.fillForm(course);
              this.courseId = course.id;
              this.selectedAuthors = course.authors;
            }
          })
        );
        this.course$.subscribe();
      } else {
        this.course$ = null;
        this.courseId = '';
        this.selectedAuthors = [];
      }
    });

    this.authorsService
      .getAuthors()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((authors: AuthorDTO[]) => {
        this.authors = authors.map(
          (author) => new Author(author.id, author.firstName, author.lastName)
        );
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

  addAuthor(author: Author) {
    this.selectedAuthors.push(author);
  }

  removeAuthor(removedAuthor: Author) {
    this.selectedAuthors = this.selectedAuthors.filter((author) => author.id !== removedAuthor.id);
  }

  mapToControls(course: VideoRecord): object {
    let { id, topRated, creationDate, authors, ...controls } = course;
    const date = creationDate.toISOString().substring(0, 10);
    controls['creationDate'] = this.datePipe.transform(date, 'dd/MM/yyyy');
    return controls;
  }

  mapToModel(controlValues): Partial<VideoRecord> {
    const { creationDate, ...values } = controlValues;
    const [ day, month, year ] = creationDate.split('/');

    values['creationDate'] = new Date(`${year}-${month}-${day}`);
    values['authors'] = this.selectedAuthors;
    return values;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
