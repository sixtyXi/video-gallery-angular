import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginBoxComponent } from './login-box.component';

describe('LoginBoxComponent', () => {
  let component: LoginBoxComponent;
  let fixture: ComponentFixture<LoginBoxComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ LoginBoxComponent ],
        imports: [ RouterTestingModule ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
