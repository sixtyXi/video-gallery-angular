import { Component, OnInit } from '@angular/core';
import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: [ './course-page.component.less' ]
})
export class CoursePageComponent implements OnInit {
  public course: VideoRecord;
  public form: FormGroup;

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
      data.id && (this.course = this.coursesService.getCourseById(+data.id));
      if (this.course) {
        const controlValues = this.mapToControls(this.course);
        this.form.setValue(controlValues);
      }
    });
  }

  onSubmit() {
    const controlValues: Partial<VideoRecord> = this.mapToModel(this.form.value);

    if (this.course) {
      const updatedCourse: VideoRecord = { ...this.course, ...controlValues };
      this.coursesService.updateCourse(updatedCourse);
    } else {
      const newCourse: Partial<VideoRecord> = { ...controlValues, topRated: false };
      this.course = this.coursesService.addCourse(newCourse);
    }

    this.router.navigate([ 'courses' ]);
  }

  onCancel() {
    this.router.navigate([ 'courses' ]);
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
