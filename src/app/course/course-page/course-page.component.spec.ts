import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoursePageComponent } from './course-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CoursePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ CoursePageComponent ],
        imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
