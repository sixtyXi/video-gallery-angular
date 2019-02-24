import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Auth from 'src/app/core/actions/auth';
import * as fromStore from '../../store/reducers/index';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.less' ]
})
export class LoginPageComponent implements OnInit {
  public login: string = '';
  public pwd: string = '';

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {}

  onLogin() {
    if (this.login && this.pwd) {
      this.store.dispatch(new Auth.Login({ auth: { login: this.login, password: this.pwd } }));
    }
  }
}
