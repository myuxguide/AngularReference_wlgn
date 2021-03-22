import {ModuleWithProviders, NgModule, Pipe, PipeTransform, Provider, Type} from '@angular/core';
import {
  FakeMissingTranslationHandler,
  TranslateCompiler,
  TranslateDefaultParser,
  TranslateFakeCompiler,
  TranslateLoader,
  TranslateService
} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

export declare interface Translations {
  [key: string]: any;
}

export class MockTranslateLoader extends TranslateLoader {
  constructor(private _translations: Translations = {}) {
    super();
  }

  getTranslation(lang: string): Observable<any> {
    return of(this._translations[lang] || {});
  }
}

@Pipe({name: 'translate'})
export class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

/**
 * The TranslateMockModule provides the TranslateModule as well as a {@link TranslateService} configured to return translations
 * specific for the test environment.
 *
 * @example
 *
 * describe('MyTranslatedComponent', () => {
 *     let component: MyComponent
 *     const ENGLISH_TRANSLATIONS = require('../../locale/en.json');
 *     const SPANISH_TRANSLATIONS = require('../../locale/es.json');
 *     const FRENCH_TRANSLATIONS = require('../../locale/fr.json');
 *
 *     beforeEach(() => {
 *         TestBed.configureTestingModule({
 *            imports: [
 *                TranslateMockModule.withTranslations('en', ENGLISH_TRANSLATIONS)
 *                                   .withTranslations('es', SPANISH_TRANSLATIONS)
 *                                   .withTranslations('fr', FRENCH_TRANSLATIONS)
 *            ],
 *            decelerations: [
 *                MyComponent
 *            ]
 *         }).compileComponents();
 *
 *         ...
 *     });
 * });
 *
 * @since 1.0.0
 */
@NgModule({
  declarations: [
    MockPipe,
  ],
  exports: [
    MockPipe
  ],
})
export class TranslateMockModule implements ModuleWithProviders {
  private _translations: Translations = {};

  private _defaultLang = 'en';

  private _compiler: TranslateCompiler;

  /**
   * Creates a new instance of the {TranslateMockModule} with translations for the specified language.
   *
   * @example
   *
   * const ENGLISH_TRANSLATIONS = {greeting: 'Hello'};
   * const TRANSLATE_MODULE = TranslateMockModule.withTranslations('en', ENGLISH_TRANSLATIONS);
   *
   * @example
   *
   * TranslateMockModule.withTranslations('en', require('../../locale/en.json'));
   *
   * @param language code for the translations
   * @param translation to be used for testing
   * @return new instance of TranslateMockModule that can be chained for additional configuration
   */
  public static withTranslations(language: string, translation: Translations): TranslateMockModule;

  /**
   * Creates a new instance of the {TranslateMockModule} with the provided translations.
   *
   * @example
   *
   * const TRANSLATIONS = {en: {greeting: 'Hello'}, es: {greeting: 'Hola'}};
   * const TRANSLATE_MODULE = TranslateMockModule.withTranslations(TRANSLATIONS);
   *
   * @param translations to used for testing
   * @return new instance of TranslateMockModule that can be chained for additional configuration
   */
  public static withTranslations(translations: Translations): TranslateMockModule;

  public static withTranslations(languageOrTranslations: string | Translations, translations?: Translations): TranslateMockModule {
    const translationSpecModule = new TranslateMockModule();
    return (typeof languageOrTranslations === 'string')
      ? translationSpecModule.withTranslations(languageOrTranslations, translations)
      : translationSpecModule.withTranslations(languageOrTranslations);
  }

  /**
   * Updates the {TranslateMockModule} instance with additional translations for a
   * specified language. The translations will be shallowly merged with any existing translations.
   *
   * @example
   *
   * const ENGLISH_TRANSLATIONS = { greeting: 'Hello' };
   * const SPANISH_TRANSLATIONS = { greeting: 'Hola' };
   * const translateModule = TranslateMockModule.withTranslations('en', ENGLISH_TRANSLATIONS)
   *                                            .withTranslations('es', SPANISH_TRANSLATIONS);
   *
   * @example
   *
   * TranslateMockModule.withTranslations('en', require('../../locale/en.json'))
   *                    .withTranslations('es', require('../../locale/es.json'));
   *
   * @param language code for the translations
   * @param translation to be used for testing
   * @return this TranslateMockModule that can be chained for additional configuration
   */
  public withTranslations(language: string, translation: Translations): TranslateMockModule;

  /**
   * Updates the {TranslateMockModule} instance with additional translations. The
   * translations will be shallowly merged with any existing translations.
   *
   * @example
   *
   * const ENGLISH_TRANSLATIONS = { en: { greeting: 'Hello' } };
   * const SPANISH_TRANSLATIONS = { en: { greeting: 'Hola' } };
   * const translateModule = TranslateMockModule.withTranslations(ENGLISH_TRANSLATIONS)
   *                                            .withTranslations(SPANISH_TRANSLATIONS);
   *
   * @example
   *
   *
   * @param translations to be used for testing
   * @return this TranslateMockModule that can be chained for additional configuration
   */
  public withTranslations(translations: Translations): TranslateMockModule;

  public withTranslations(languageOrTranslations: string | Translations, translations?: Translations): TranslateMockModule {
    if (typeof languageOrTranslations === 'string' && translations) {
      this.appendTranslations(languageOrTranslations, translations);
      this._defaultLang = languageOrTranslations;
    } else if (languageOrTranslations) {
      Object.keys(languageOrTranslations)
        .forEach((lang) => this.appendTranslations(lang, languageOrTranslations[lang]));
    }
    return this;
  }

  /**
   * Updates the {TranslateMockModule} to provide a {TranslateService} that will
   * use the provided {@link TranslateCompiler} to translate the test translations.
   *
   * @example
   *
   * TranslateMockModule.withTranslations('en', {people: '{gender, select, male{He is} female{She is} other{They are}} {how})'})
   *                    .withCompiler(new TranslateMessageFormatCompiler());
   *
   * @param compiler the compiler to use to compile the test translations.
   * @returns this TranslateMockModule that can be used to chain additional configuration.
   */
  public withCompiler(compiler: TranslateCompiler): TranslateMockModule {
    this._compiler = compiler;
    return this;
  }

  /**
   * Updates the {TranslateMockModule} to use the provided language as the default language.
   * By default, the default language will be set to the first language provided.
   *
   * @example
   *
   * TranslateMockModule.withTranslations('es', SPANISH_TRANSLATIONS)
   *                    .withTranslations('en', ENGLISH_TRANSLATIONS)
   *                    .withDefaultLanguage('en');
   *
   * @param language the new default language for translations.
   * @returns translateMockModule that can be used to chain additional configuration.
   */
  public withDefaultLang(language: string): TranslateMockModule {
    this._defaultLang = language || this._defaultLang;
    return this;
  }

  private appendTranslations(language: string, translations: Translations) {
    if (!this._defaultLang) this._defaultLang = language;
    if (this._translations[language]) this._translations[language] = {...this._translations[language], ...translations};
    else this._translations[language] = translations;
  }

  public get providers(): Provider[] {
    const mockTranslateService = new TranslateService(
      null,
      new MockTranslateLoader(this._translations),
      this._compiler || new TranslateFakeCompiler(),
      new TranslateDefaultParser(),
      new FakeMissingTranslationHandler(),
      true,
      true
    );

    if (this._defaultLang) mockTranslateService.setDefaultLang(this._defaultLang);

    return [{provide: TranslateService, useValue: mockTranslateService}];
  }

  public get ngModule(): Type<any> {
    return TranslateMockModule;
  }
}
