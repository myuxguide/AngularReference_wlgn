import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ForgotUseridComponent } from './forgot-userid.component';
import { LocaleService } from '@fedex/caas';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';

describe('ForgotUseridComponent', () => {
  let component: ForgotUseridComponent;
  let fixture: ComponentFixture<ForgotUseridComponent>;
  let localeService: LocaleService;
  let configService: ConfigurationService;
  const ENGLISH_TRANSLATIONS = require('src/assets/i18n/en.json');

  beforeAll(() => {
    configService = new ConfigurationService(null);
    configService.appConfig = { ...require('../../../../assets/configs/config.json'), ...require('../../../../assets/configs/level.json') };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotUseridComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS })],
      providers: [LocaleService, { provide: ConfigurationService, useValue: configService }]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotUseridComponent);
    localeService = TestBed.inject(LocaleService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Testcase to check if 'Forgot Your UserId Or Password' link is available'
  it('should display a button Customer Support', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#requestCode-btn').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.forgotUserId.forgotButton);
  }));

  /*// Testcase to check 'Forgot Your UserId Or Password' button click event
  it('should call navigateToCreateAccount method', () => {
    spyOn(component, 'navigateToLoginSolutions').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('#requestCode-btn');
    button.click();
    fixture.detectChanges();
    expect(component.navigateToLoginSolutions).toHaveBeenCalled();
  });*/
});

















