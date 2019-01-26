import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { CourseListComponent } from './course-list.component';
import { COURSES } from '../mock-courses';
import { OrderByPipe } from './order-by.pipe';

@Component({ selector: 'app-course-item', template: '<div class="course-item-stub"></div>' })
class CourseItemStubComponent {}

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ CourseListComponent, CourseItemStubComponent, OrderByPipe ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize #courses after #ngOnInit', () => {
    component.ngOnInit();
    expect(component.courses).toEqual(COURSES);
  });

  it('should invoke #onLoadMore on load more button click', () => {
    const hostElement = fixture.nativeElement;
    const loadMoreBtn: HTMLButtonElement = hostElement.querySelector('.load-more-btn');

    spyOn(component, 'onLoadMore');
    loadMoreBtn.dispatchEvent(new Event('click'));
    expect(component.onLoadMore).toHaveBeenCalled();
  });

  it('should render as many course-items as there are elements in #courses', () => {
    const hostElement = fixture.nativeElement;
    const mockCoursesAmount = COURSES.length;
    let courseItemStubs: NodeList;

    courseItemStubs = hostElement.querySelectorAll('.course-item-stub');
    expect(courseItemStubs.length).toBe(mockCoursesAmount);
  });
});
