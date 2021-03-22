import { Component, OnDestroy } from '@angular/core';
import { Locale, LocaleService } from '@fedex/caas';
import { Observable, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { I18n } from './I18n';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'wlgn-root',
  templateUrl: './app.component.html',
  styles: [':host main {padding-top: 2em}']
})
export class AppComponent implements OnDestroy {

  constructor(private localeService: LocaleService,
    private titleService: Title,
    private translateService: TranslateService) {
    this.configureLanguages();
    this.setupInitialTranslations();
    this.listenForLocaleChanges();

  }

  private subscriptions = new Subscription();
  private static toSupportedLang({ language, posix }: Locale): string {
    const includesPosix = I18n.SUPPORTED_LANGS.includes(posix);
    const includesLanguageCode = I18n.SUPPORTED_LANGS.includes(language.code);

    return includesPosix ? posix : includesLanguageCode ? (language.code === 'el') ? 'gr' : language.code : 'en';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Initializes translations for the entire WLGN app
   */

  private configureLanguages(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.addLangs(I18n.SUPPORTED_LANGS);
  }

  private setupInitialTranslations(): void {
    this.setTranslationLanguage(this.localeService.userLocale);
    this.subscriptions.add(this.getTitle().subscribe(this.setDocumentTitle));
  }

  private listenForLocaleChanges(): void {
    this.subscriptions.add(
      this.localeService.userLocaleChange$
        .pipe(mergeMap(this.setTranslationLanguage), mergeMap(this.getTitle))
        .subscribe(this.setDocumentTitle)
    );
  }

  private setTranslationLanguage = (locale: Locale): Observable<unknown> => {
    const language = AppComponent.toSupportedLang(locale);
    return this.translateService.use(language);
  };

  private setDocumentTitle = (title: string): void => {
    this.titleService.setTitle(title);
  };

  private getTitle = (): Observable<string> => {
    return this.translateService.get('title');
  };

}
