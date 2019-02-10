import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CourseListComponent } from './course-list.component';
import { COURSES } from '../../shared/mocks/mock-courses';
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
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        imports: [ HttpClientTestingModule ]
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

  it('should request #courses after #ngOnInit', () => {
    spyOn(component, 'getList');
    component.ngOnInit();
    expect(component.getList).toHaveBeenCalled();
  });

  it('should invoke #onLoadMore on load more button click', () => {
    const hostElement = fixture.nativeElement;
    const loadMoreBtn: HTMLButtonElement = hostElement.querySelector('.load-more-btn');

    spyOn(component, 'onLoadMore');
    loadMoreBtn.click();
    expect(component.onLoadMore).toHaveBeenCalled();
  });
});
