import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {CAAS_CONFIGURATOR, CaasConfig, FedexCaasModule, LocaleService} from '@fedex/caas';
import {TranslateMockModule} from './util/translate.mock.module';
import {WindowRef} from './util/window.ref';
import {PopupComponent} from './shared/components/popup/popup.component';
import {CommonCoreModule} from '@fedex/common-core';

describe('AppComponent', () => {
  let localeService: LocaleService;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const ENGLISH_TRANSLATIONS = require('../assets/i18n/en.json');
  const FRENCH_TRANSLATIONS = require('../assets/i18n/fr.json');
  const FRENCH__CANADA_TRANSLATIONS = require('../assets/i18n/fr_CA.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FedexCaasModule,
        CommonCoreModule,
        TranslateMockModule
          .withTranslations('en', ENGLISH_TRANSLATIONS)
          .withTranslations('fr', FRENCH_TRANSLATIONS)
          .withTranslations('fr_CA', FRENCH__CANADA_TRANSLATIONS)
          .withDefaultLang('en')
      ],
      declarations: [
        AppComponent, PopupComponent
      ],
      providers: [
        {
          provide: CAAS_CONFIGURATOR, useValue: {
            host: 'wwwbase.idev.fedex.com',
            loglevel: 'OFF',
            adobelaunch: false,
            commoncore: false
          } as CaasConfig
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    localeService = TestBed.inject(LocaleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject localized app title', () => {
    const titleEl: HTMLElement = WindowRef.document.head.querySelector('title');
    expect(titleEl.innerHTML).toEqual(ENGLISH_TRANSLATIONS.title);
  });

  it('should change app title when locale changes to a simple locale "fr_FR', (done) => {
    const titleElLookup = () => WindowRef.document.head.querySelector('title');

    localeService.updateUserLocale('fr-fr');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(titleElLookup().innerHTML).toEqual(FRENCH_TRANSLATIONS.title);
      done();
    });
  });

  it('should change app title when locale changes to a complex locale "fr_CA"', (done) => {
    const titleElLookup = () => WindowRef.document.head.querySelector('title');

    localeService.updateUserLocale('fr-ca');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(titleElLookup().innerHTML).toEqual(FRENCH__CANADA_TRANSLATIONS.title);
      done();
    });
  });
});
