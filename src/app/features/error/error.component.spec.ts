import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateService } from '@ngx-translate/core';
import { ErrorComponent } from './error.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { Router } from '@angular/router';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  const ENGLISH_TRANSLATIONS = require('src/assets/i18n/en.json');
  let configService: ConfigurationService;
  let router: Router;

  beforeAll(() => {
    configService = new ConfigurationService(null);
    configService.appConfig = { ...require('src/assets/configs/config.json'), ...require('src/assets/configs/level.json') };
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS })],
      providers: [SharedService, { provide: ConfigurationService, useValue: configService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // To check if screen title is 'error page varibage'
  it('should display Enter Your User ID and Password to log in heading', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(ErrorComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#title').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.error.functionalErr);
  }));

  it('should do something on window popstate', () => {
    const spyNavigate = spyOn(router, 'navigate');
    window.dispatchEvent(new Event('popstate'));
    fixture.detectChanges();
    expect(spyNavigate).toHaveBeenCalledWith(['/login-credentials']);
  });
});
