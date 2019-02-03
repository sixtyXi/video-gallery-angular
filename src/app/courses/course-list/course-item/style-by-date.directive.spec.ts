import { StyleByDateDirective } from './style-by-date.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `
    <span [appStyleByDate]="tenDaysAgo">Fresh date</span>
    <span [appStyleByDate]="tenDaysAfter">Future date</span>
    <span [appStyleByDate]="oldDate">Old date</span>
  `
})
class TestComponent {
  tenDaysAgo = new Date().setDate(new Date().getDate() - 10);
  tenDaysAfter = new Date().setDate(new Date().getDate() + 10);
  oldDate = new Date(1970);
}

describe('StyleByDateDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elements: HTMLElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ StyleByDateDirective, TestComponent ]
    }).createComponent(TestComponent);

    elements = fixture.nativeElement.querySelectorAll('span');
    fixture.detectChanges();
  });

  it('should border color 1st element green', () => {
    const borderColor = elements[0].style.borderColor;
    expect(borderColor).toBe('green');
  });

  it('should border color 2nd element blue', () => {
    const borderColor = elements[1].style.borderColor;
    expect(borderColor).toBe('blue');
  });

  it("shouldn't change border color 3rd element", () => {
    const borderColor = elements[2].style.borderColor;
    expect(borderColor).toBe('');
  });
});
