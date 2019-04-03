import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.less' ]
})
export class HeaderComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs([ 'en', 'ru' ]);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  public changeLang(lang: string) {
    this.translate.use(lang);
  }
}
