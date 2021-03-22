import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocaleService } from '@fedex/caas';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { TranslateMockModule } from 'src/app/util/translate.mock.module';
import { APIResponse } from '../models/Response';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;
  let configService: ConfigurationService;
  const ENGLISH_TRANSLATIONS = require('src/assets/i18n/en.json');

  beforeAll(() => {
    TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS });
    configService = new ConfigurationService(null);
    configService.appConfig = { ...require('../../../assets/configs/config.json'), ...require('../../../assets/configs/level.json'), };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, TranslateMockModule,
        TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS })
      ],

      providers: [
        SharedService, LocaleService,
        { provide: ConfigurationService, useValue: configService }]
    });
    service = TestBed.inject(SharedService);
    configService = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Testcase to check if correct API response is returned
  it('get APIResponse should return valid value', fakeAsync(() => {
    const mockResp: APIResponse = {
      output: {
        sessionId: 'KKD342FJ',
        twoFAEnabled: false,
        trustDevice: false,
        fclCookie: 'Afs4354',
        contactNameCookie: 'Snehal Patil',
        nameCookie: 'Snehal',
        uuidCookie: 'LlXgT5Dz1i',
        /*loginCookieOutputVO: {
          fclCookie: '10027.9d91.40d0134c6316807047c32b21ff445c56',
          nameCookie: 'Snehal',
          contactNameCookie: 'Snehal Patil',
          uuidCookie: 'LlXgT5Dz1i'
        },*/
        verificationMethods: [
          {
            deliveryMethod: 'CALL',
            address: '###-###-234',
            primary: true
          },
          {
            deliveryMethod: 'SMS',
            address: '###-###-234',
            primary: false
          },
          {
            deliveryMethod: 'EMAIL',
            address: 's###@###.com',
            primary: true
          }
        ]
      }
    };
    service.apiResponse = mockResp;
    const result = service.apiResponse;
    expect(result).toEqual(mockResp);
  }));

  // Testcase to check redirection url should work and sourceurl should not be blank
  it('Check redirection url should work and sourceurl should not be blank', () => {
    service.redirectToFedexHomePage();
    expect(service.sourceRedirectUrl).not.toBe('');
  });

  // Unit Test Case for Start Timer
  it('should Call "startTimer" Method', () => {
    const spyStartTime = spyOn(service, 'startTimer');
    service.startTimer();
    expect(spyStartTime).toHaveBeenCalled();
  });

  // Unit Test Case for 'timeoutOccurred'
  it('should Call "timeoutOccurred" Method', () => {
    const spyTimeOccurred = spyOn(service, 'timeoutOccurred');
    service.timeoutOccurred();
    expect(spyTimeOccurred).toHaveBeenCalled();
    service.redirectToFedexHomePage();
    expect(service.sourceRedirectUrl).not.toBe('');
  });
});
