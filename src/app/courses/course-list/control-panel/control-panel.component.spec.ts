import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ControlPanelComponent } from './control-panel.component';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;
  let hostElement: any;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ ControlPanelComponent ],
        imports: [ RouterTestingModule, ReactiveFormsModule ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should take value from search input', () => {
    const searchInput: HTMLInputElement = hostElement.querySelector('.search-control__input');
    const inputValue = 'Text to search';

    searchInput.value = inputValue;
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchField.value).toBe(inputValue);
  });
});
