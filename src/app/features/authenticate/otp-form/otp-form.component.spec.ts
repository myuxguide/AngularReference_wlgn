import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocaleService } from '@fedex/caas';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AuthenticateUserService } from 'src/app/services/authenticate-user/authenticate-user.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { SendOtpService } from 'src/app/services/send-otp/send-otp.service';
import { APIResponse } from 'src/app/shared/models/Response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MockVerifyService } from '../authenticate.component.spec';
import { OtpFormComponent } from './otp-form.component';
import {HttpErrorResponse} from '@angular/common/http';


export class MockElementRef extends ElementRef { }
describe('OtpFormComponent', () => {
  let component: OtpFormComponent;
  let fixture: ComponentFixture<OtpFormComponent>;
  let configService: ConfigurationService;
  let router: Router;
  let sharedService: SharedService;
  const ENGLISH_TRANSLATIONS = require('src/assets/i18n/en.json');
  let elRef: ElementRef;
  let authenticateUserService: AuthenticateUserService;

  beforeAll(() => {
    configService = new ConfigurationService(null);
    configService.appConfig = { ...require('src/assets/configs/config.json'), ...require('src/assets/configs/level.json') };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtpFormComponent],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS }),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        LocaleService,
        SharedService,
        { provide: ConfigurationService, useValue: configService },
        { provide: ElementRef, useClass: MockElementRef },
        { provide: SendOtpService, useClass: MockVerifyService }
      ]

    })
      .compileComponents();
    elRef = TestBed.inject(ElementRef);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpFormComponent);
    component = fixture.componentInstance;
    authenticateUserService = TestBed.inject(AuthenticateUserService);
    sharedService = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case for verify code method
  it('should check verifyCodeMethod', () => {
    component.formSubmit = false;
    component.verifyCodeMethod();
    expect(component.formSubmit).toEqual(true);
  });

  // Test case for on Blur event code method for 3rd input box
  it('should check onBlurEvent method for 3rd input box', () => {
    const index = 2;
    component.onBlurEvent(index);
    expect(component.digitValidStatus).toEqual(true);
  });

  // Test case for on Blur event code method for 1st input box
  it('should check onBlurEvent method for 1st input box ', () => {
    const index = 0;
    component.onBlurEvent(index);
    expect(component.digitValidStatus).toEqual(false);
  });

  // Test case for onkeydown function to prevent to press up and down arrow on input box
  it('should prevent to press up and down arrowssingle digit when key press', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.target = {
      maxLength: 1,
      value: '2'
    };
    event.which = 38;
    component.onKeyDown(event, 1);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  // Test case to restrict to single digit when key down
  it('should restrict to single digit when key down', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.target = {
      maxLength: 1,
      value: ''
    };
    event.which = 8;
    component.onKeyDown(event, 1);
    expect(event.target.value).toBe('');
  });

  // Test case to call sendVerificationCode method of AuthenticateUserService
  it('should call sendVerificationCode method of AuthenticateUserService', fakeAsync(() => {
    const response: any = {
      status: '200',
      output: [
        {
          message: 'success'
        }
      ]
    };

    component.verificationCodeForm.setValue({
      digit1: '1',
      digit2: '1',
      digit3: '1',
      digit4: '1',
      digit5: '1',
      digit6: '1'
    });

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

    const verifyOtpRequest = {
      UUID: 'LlXgT5Dz1i',
      sessionId: 'KKD342FJ',
      otp: '111111',
      trustDeviceId: false
    };

    sharedService.apiResponse = mockResp;
    component.verifyCodeMethod();
    fixture.detectChanges();

    spyOn(component, 'navigateToHomePage').and.callThrough();
    authenticateUserService.verifyOtp(verifyOtpRequest).subscribe((result) => {
      expect(result).not.toBe(null);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(response));
      expect(component.navigateToHomePage).toHaveBeenCalled();
    });
    expect(component.expiredAndIncorrectError).toEqual(false);
  }));

  // Test case for onValueChange function with next box focus
  it('should focus next box when value change', fakeAsync(() => {
    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const index = 1;
    const event = {
      target: {
        maxLength: 1,
        value: '3',
        id: 'input1'
      },
      which: 39
    };
    component.onValueChange(event, index);
    tick(2000);
    fixture.detectChanges();
    expect((debugEl.querySelectorAll('input[type=number]')[index + 1]).id).toEqual(debugEl.querySelector(':focus').id);
  }));

  // Test case for onValueChange function with previous box focus
  it('should focus previous box when value change', fakeAsync(() => {
    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const index = 1;
    const event = {
      target: {
        maxLength: 1,
        value: '',
        id: 'input2'
      },
      keyCode: 8
    };
    component.onValueChange(event, index);
    tick(2000);
    fixture.detectChanges();
    expect((debugEl.querySelectorAll('input')[index - 1]).id).toEqual(debugEl.querySelector(':focus').id);
  }));

  // Test case for onValueChange function with previous box focus
  it('should focus previous box when left arrow pressed', fakeAsync(() => {
    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const index = 1;
    const event = {
      target: {
        maxLength: 1,
        value: '',
        id: 'input2'
      },
      keyCode: 37
    };
    component.onValueChange(event, index);
    tick(2000);
    fixture.detectChanges();
    expect((debugEl.querySelectorAll('input')[index - 1]).id).toEqual(debugEl.querySelector(':focus').id);
  }));

  // Testcase to check focusing of verification code input field on page load
  it('should check ngAfterViewInit() is focusing verification code textbox when page is loaded', () => {
    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const index = 0;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect((debugEl.querySelectorAll('input')[index]).id).toEqual(debugEl.querySelector(':focus').id);
  });

  // Test case to check status 500
  it('On click of submit button should get error status 500', () => {
    const response = new HttpErrorResponse({
      error: {
        transactionId: '624deea6-b709-470c-8c39-4b5511281492',
        errors: [{ code: 'INTERNAL.SERVER.ERROR', parameterList: [], message: 'Internal server error' }]
      }
    });
    spyOn(router, 'navigate').and.stub();
    component.errorHandler(response);
    expect(component.expiredAndIncorrectError).toEqual(false);
  });

  // Check when 400 error occurs, expiredAndIncorrectError flag is set to true
  it('On click of submit button should get PIN Incorrect error status 400', () => {
    const response = new HttpErrorResponse({
      error: {
        transactionId: '624deea6-b709-470c-8c39-4b5511281492',
        errors: [{ code: 'PIN.INCORRECT', parameterList: [], message: 'PIN is incorrect' }]
      }
    });
    component.errorHandler(response);
    fixture.detectChanges();
    expect(component.expiredAndIncorrectError).toEqual(true);
  });

  // Check when 400 error occurs, expiredAndIncorrectError flag is set to true
  it('On click of submit button should get PIN Expired error status 400', () => {
    const response = new HttpErrorResponse({
      error: {
        transactionId: '624deea6-b709-470c-8c39-4b5511281492',
        errors: [{ code: 'PIN.EXPIRED', parameterList: [], message: 'PIN got expired' }]
      }
    });
    component.errorHandler(response);
    fixture.detectChanges();
    expect(component.expiredAndIncorrectError).toEqual(true);
  });

  // To check if test link button is visible
  it('should display submit button', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(OtpFormComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#submit-btn').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.otpForm.submitBtn);
  }));

  // Testcase to check if 'submit' button is available
  it('should display a button Submit', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#submit-btn').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.otpForm.submitBtn);
  }));

  it('should check remember me', () => {
    const event = {
      target: {
        checked: true
      }
    };
    component.trustThisDeviceCheck(event);
    expect(component.trustDevice).toBe(true);
  });

});
