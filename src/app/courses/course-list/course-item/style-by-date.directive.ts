import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStyleByDate]'
})
export class StyleByDateDirective implements OnInit {
  @Input('appStyleByDate') creationDate: Date;

  private freshColor: string = 'green';
  private upcomingColor: string = 'blue';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.applyStyles(this.creationDate);
  }

  applyStyles(creationDate: Date) {
    const currentDate = new Date();
    const freshPeriod = 14;
    let color = '';

    if (creationDate < currentDate) {
      const lastFreshDate: Date = this.getSubtractedDate(currentDate, freshPeriod);

      if (creationDate >= lastFreshDate) {
        color = this.freshColor;
      }
    } else {
      color = this.upcomingColor;
    }

    if (color) {
      this.el.nativeElement.style.borderColor = color;
    }
  }

  getSubtractedDate(date: Date, days: number) {
    const copyDate = new Date(date.valueOf());

    copyDate.setDate(copyDate.getDate() - days);
    return copyDate;
  }
}
