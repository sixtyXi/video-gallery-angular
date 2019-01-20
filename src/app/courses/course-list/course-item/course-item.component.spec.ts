import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CourseItemComponent } from './course-item.component';
import { VideoCourse } from 'src/app/shared/VideoCourse.model';
import { StyleByDateDirective } from './style-by-date.directive';
import { FormatDurationPipe } from './format-duration.pipe';

const mockItem: VideoCourse = {
  id: 1,
  title: 'Video Course 1',
  creationDate: new Date(2018, 4, 23),
  duration: 88,
  description: 'Lorem, ipsum dolor sit amet consectetur',
  topRated: false
};

let component: CourseItemComponent;

describe('CourseItemComponentClassTest', () => {
  beforeEach(() => {
    component = new CourseItemComponent();
  });

  it('raises #item.id when clicked', () => {
    component.item = mockItem;
    component.onDelete.subscribe((courseId) => expect(courseId).toBe(mockItem.id));
    component.click();
  });
});

describe('CourseItemComponentStandAloneTest', () => {
  let fixture: ComponentFixture<CourseItemComponent>;
  let hostElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, StyleByDateDirective, FormatDurationPipe ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    component.item = mockItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display video title in article title', () => {
    const expectedValue = mockItem.title;
    const title: HTMLElement = hostElement.querySelector('.course-item__title');

    expect(title.textContent).toBe(expectedValue);
  });

  it('should display video description in course-item__desc', () => {
    const expectedValue = mockItem.description;
    const desc: HTMLElement = hostElement.querySelector('.course-item__desc');

    expect(desc.textContent).toBe(expectedValue);
  });

  it('should display formatted duration in course-item__duration', () => {
    const expectedValue = '1h 28min';;
    const el: HTMLElement = hostElement.querySelector('.course-item__duration');

    expect(el.textContent).toBe(expectedValue);
  });

  it('should display formatted creation date in course-item__date', () => {
    const expectedValue = '05.23.2018';
    const el: HTMLElement = hostElement.querySelector('.course-item__date');

    expect(el.textContent).toBe(expectedValue);
  });

  it('should invoke #click on delete button click', () => {
    const deleteBtn: HTMLButtonElement = hostElement.querySelector('.course-item__btn--delete');

    spyOn(component, 'click');
    deleteBtn.dispatchEvent(new Event('click'));
    expect(component.click).toHaveBeenCalled();
  });
});

describe('CourseItemComponentTestHostApproach', () => {
  @Component({
    template: `<app-course-item
        [item]="item"
        (onDelete)="deleteById($event)">
      </app-course-item>`
  })
  class TestHostComponent {
    item = mockItem;

    deleteById(courseId: number) {}
  }

  let fixture: ComponentFixture<TestHostComponent>;
  let hostElement;
  let testHostComp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, TestHostComponent, StyleByDateDirective, FormatDurationPipe ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);;
    testHostComp = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    component.item = mockItem;
    fixture.detectChanges();
  });

  it('should raise #item.id when clicked', () => {
    const deleteBtn = hostElement.querySelector('.course-item__btn--delete');
    const expectedId = testHostComp.item.id;

    spyOn(testHostComp, 'deleteById');
    deleteBtn.dispatchEvent(new Event('click'));
    expect(testHostComp.deleteById).toHaveBeenCalled();
    expect(testHostComp.deleteById).toHaveBeenCalledWith(expectedId);
  });
});
