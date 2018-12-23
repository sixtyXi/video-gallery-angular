import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ControlPanelComponent } from './control-panel.component';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;
  let hostElement: any;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ ControlPanelComponent ],
        imports: [ FormsModule ]
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

    expect(component.txtToSearch).toBe(inputValue);
  });

  it('should invoke #onSearch on search button click', () => {
    const searchBtn: HTMLButtonElement = hostElement.querySelector('.search-control__btn');

    spyOn(component, 'onSearch');
    searchBtn.dispatchEvent(new Event('click'));
    expect(component.onSearch).toHaveBeenCalled();
  });
});
