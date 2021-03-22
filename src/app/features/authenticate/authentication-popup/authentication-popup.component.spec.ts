import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AuthenticationPopupComponent } from './authentication-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from '@fedex/caas';
import { of } from 'rxjs';
import { SendOtpService } from 'src/app/services/send-otp/send-otp.service';
import { delay } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { APIResponse } from 'src/app/shared/models/Response';
import {HttpErrorResponse} from '@angular/common/http';

export class MockFactorsService {
  sendVerificationCode = (): any => of({});
}

describe('AuthenticationPopupComponent', () => {
  let component: AuthenticationPopupComponent;
  let fixture: ComponentFixture<AuthenticationPopupComponent>;
  let localeService: LocaleService;
  let configService: ConfigurationService;
  let router: Router;
  const ENGLISH_TRANSLATIONS = require('src/assets/i18n/en.json');
  let sendOtpService: SendOtpService;

  beforeAll(() => {
    configService = new ConfigurationService(null);
    configService.appConfig = { ...require('../../../../assets/configs/config.json'), ...require('../../../../assets/configs/level.json') };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationPopupComponent],
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS })],
      providers: [LocaleService, { provide: ConfigurationService, useValue: configService }, { provide: SendOtpService, useClass: MockFactorsService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationPopupComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
    localeService = TestBed.inject(LocaleService);
    sendOtpService = TestBed.inject(SendOtpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case to check selectDeliveryMethod
  it('should call selectDeliveryMethod', () => {
    const method = 'phone';
    component.selectDeliveryMethod(method);
    fixture.detectChanges();
    expect(component.selectedMethod).toBe('phone');
  });

  // Test case to check sendVerificationCode method for success case
  it('should call sendVerificationCode method for success case', fakeAsync(() => {
    const response = {
      output: { 'maxLimit': true }
    };
    component.response = {
      output: {
        uuidCookie: '7zqesGMub0',
        sessionId: 'KKKDFJ332kdfkj'
      }
    };
    spyOn(sendOtpService,  'sendVerificationCode').and.returnValue(of(response).pipe(delay(1)));
    component.confirm();
    fixture.detectChanges();
    expect(sendOtpService.sendVerificationCode).toHaveBeenCalled();
    tick(1000);
  }));

  // Test case to check Choose a verification method on screen
  it('should display Choose a verification method-title', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');

    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;

    expect(element.querySelector('#verifyMethodTitle').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.chooseVerifyMethod.verifyMethodTitle);
  }));

  // Test case to check if 'subtitle' is available'
  it('should display subtitle', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#verifyMethodSubtitle').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.chooseVerifyMethod.verifyMethodSubtitle);
  }));

  // Test case to check if 'confirm' button is available
  it('should display confirm button', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#confirm-btn').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.chooseVerifyMethod.confirmButton);
  }));

  // Test case to check if 'cancel' text is available'
  it('should display cancel button', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#cancelBtn').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.chooseVerifyMethod.cancelButton);
  }));
  // Test case to check close popup method
  it('should check close popup', () => {
    spyOn(component.hidePopup, 'emit');
    fixture.detectChanges();
    component.closePopup();
    expect(component.hidePopup.emit).toHaveBeenCalled();
  });

  // Test case for verified response method
  it('should check errorHandler success case', () => {
    const err = new HttpErrorResponse({
      error: {
        status: '400',
        errors: [{ code: 'ATTEMPT.EXCEEDED' }]
      }
    });
    /*component.response = {
      output: {
        uuidCookie: '7zqesGMub0',
        sessionId: 'KKKDFJ332kdfkj',
        verificationMethods: [{
          deliveryMethod: 'EMAIL'
        }]
      }
    };*/
    const spyNavigate = spyOn(router, 'navigate');
    spyOn(sendOtpService, 'sendVerificationCode').and.throwError(err);
    component.errorHandler(err);
    fixture.detectChanges();
    expect(spyNavigate).toHaveBeenCalledWith(['/fail']);
  });
  it('should call sendVerificationCode method for success case', () => {
    const response: APIResponse = {
      status: '200',
      output: {}
    };
    component.response = {
      output: {
        uuidCookie: '7zqesGMub0',
        sessionId: 'KKKDFJ332kdfkj',
        verificationMethods: [{
          deliveryMethod: 'EMAIL'
        }]
      }
    };
    spyOn(sendOtpService, 'sendVerificationCode').and.returnValue(of(response).pipe(delay(1)));
    spyOn(component, 'errorHandler').and.callThrough();
    component.confirm();
    fixture.detectChanges();
    expect(sendOtpService.sendVerificationCode).toHaveBeenCalled();
  });

  // Test case to check status 400 Exceeded
  it('On click of login button should get error status 400 Exceeded', () => {
    const err = new HttpErrorResponse({
      error: {
        transactionId: '624deea6-b709-470c-8c39-4b5511281492',
        errors: [{ code: 'LOGIN.UNSUCCESSFUL.EXCEEDED', parameterList: [], message: 'Internal server error' }]
      }
    });
    component.errorHandler(err);
    fixture.detectChanges();
  });
});
