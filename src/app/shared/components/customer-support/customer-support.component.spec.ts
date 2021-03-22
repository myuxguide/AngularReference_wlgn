import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { CustomerSupportComponent } from './customer-support.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { LocaleService } from '@fedex/caas';
import { TranslateService } from '@ngx-translate/core';

describe('CustomerSupportComponent', () => {
  let component: CustomerSupportComponent;
  let fixture: ComponentFixture<CustomerSupportComponent>;
  let configService: ConfigurationService;
  let localeService: LocaleService;
  const ENGLISH_TRANSLATIONS = require('src/assets/i18n/en.json');

  beforeAll(() => {
    configService = new ConfigurationService(null);
    configService.appConfig = { ...require('./../../../../assets/configs/config.json'), ...require('./../../../../assets/configs/level.json') };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSupportComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS })],
      providers: [{ provide: ConfigurationService, useValue: configService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localeService = TestBed.inject(LocaleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   // Testcase to check if 'CUSTOMER SUPPORT' button is available'
   it('should display a button Customer Support', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#support-link').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.customerSupport.supportLink);
  }));

  // Testcase to check 'CUSTOMER SUPPORT' button click event
  it('should call navigatetoCustomerSupport method', () => {
    spyOn(component, 'navigateToCustomerSupport').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('#support-link');
    button.click();
    fixture.detectChanges();
    expect(component.navigateToCustomerSupport).toHaveBeenCalled();
  });
});
