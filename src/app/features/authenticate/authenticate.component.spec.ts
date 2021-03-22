import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AuthenticateComponent } from './authenticate.component';
import { LocaleService } from '@fedex/caas';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { LoginCredentialService } from 'src/app/services/login-credential/login-credential.service';
import { ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Subscription, throwError } from 'rxjs';
import { AuthenticationPopupComponent } from 'src/app/features/authenticate/authentication-popup/authentication-popup.component';
import { APIResponse } from 'src/app/shared/models/Response';
import { Router } from '@angular/router';
import { SendOtpService } from 'src/app/services/send-otp/send-otp.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { delay } from 'rxjs/operators';
import {User} from '../../shared/models/User';
import {HttpErrorResponse} from '@angular/common/http';
import {OtpFormComponent} from './otp-form/otp-form.component';
import {CustomerSupportComponent} from '../../shared/components/customer-support/customer-support.component';


export class MockVerifyService {
  sendVerificationCode = (): any => of({});
}

export class MockElementRef extends ElementRef { }
describe('AuthenticateComponent', () => {
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;
  let configService: ConfigurationService;
  let router: Router;
  let sendOtpService: SendOtpService;
  let sharedService: SharedService;
  const ENGLISH_TRANSLATIONS = require('src/assets/i18n/en.json');

  let mockAPIResp: APIResponse = {
    output: {
      sessionId: 'KKD342FJ',
      twoFAEnabled: false,
      trustDevice: false,
      fclCookie: 'Afs4354',
      contactNameCookie: 'Snehal Patil',
      nameCookie: 'Snehal',
      uuidCookie: 'YYq5TN9Qe2',
     /* loginCookieOutputVO: {
        fclCookie: '10027.9d91.40d0134c6316807047c32b21ff445c56',
        nameCookie: 'Snehal',
        contactNameCookie: 'Snehal Patil',
        uuidCookie: 'YYq5TN9Qe2'
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


  beforeAll(() => {
    configService = new ConfigurationService(null);
    configService.appConfig = { ...require('src/assets/configs/config.json'), ...require('src/assets/configs/level.json') };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticateComponent, AuthenticationPopupComponent, OtpFormComponent, CustomerSupportComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS }),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        LocaleService,
        SharedService,
        { provide: ConfigurationService, useValue: configService },
        { provide: ElementRef, useClass: MockElementRef },
        { provide: SendOtpService, useClass: MockVerifyService }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    sharedService.apiResponse = mockAPIResp;
    router = TestBed.inject(Router);
    sendOtpService = TestBed.inject(SendOtpService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // To check if test link button is visible
  it('should display test link', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(AuthenticateComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#verifyOptionsLink-btn').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.verifyOptions.verifyOptionsLink);
  }));

  // Modal Should Open once mock API get called
  it('should set flag true to open authentication popup method',
    inject([TranslateService, LoginCredentialService], (translateService: TranslateService, service: LoginCredentialService) => {
      const userParams = new User({
        userName: '',
        password: '',
        deviceId: 'staticone'
      });
      translateService.setDefaultLang('en');
      component.openPopUp();
      fixture.detectChanges();
      service.newValidateLogin(userParams).subscribe(() => {
        expect(component.authenticationModalFlag).toBe(true);
      });
    }));

  it('API response should not be null',
    inject([TranslateService, LoginCredentialService], (translateService: TranslateService, service: LoginCredentialService) => {
      const userParams = new User({
        userName: '',
        password: '',
        deviceId: 'staticone'
      });
      let mockResp: APIResponse = {
        output: {
          sessionId: 'KKD342FJ',
          twoFAEnabled: true,
          trustDevice: true,
          fclCookie: 'Afs4354',
          contactNameCookie: 'Shubham Bhairappa',
          nameCookie: 'Shubham',
          uuidCookie: '453dfsfff',
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
      spyOn(sendOtpService, 'sendVerificationCode').and.returnValue(of(mockResp).pipe(delay(1)));
      translateService.setDefaultLang('en');
      component.openPopUp();
      fixture.detectChanges();
      service.newValidateLogin(userParams).subscribe((response) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockResp));
        expect(component.apiResponse).toBe(mockResp.output);
        expect(component.apiResponse).not.toBe(null);
        expect(component.authenticationModalFlag).toBe(true);
      });
    }));

  // this assumes you have unsubscribed from the subscription in your
  // component, which you should always do in the ngOnDestroy of the component
  it('should unsubscribe when component destroyed', () => {
    fixture = TestBed.createComponent(AuthenticateComponent);
    fixture.detectChanges();
    spyOn(Subscription.prototype, 'unsubscribe');
    fixture.destroy();
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalled();
  });

  // Test case to check hide popup method
  it('should check hide popup', () => {
    const event = false;
    component.hidePopup(event);
    expect(component.authenticationModalFlag).toBe(false);
  });

  // To check if screen title is 'Verify your identity'
  it('should display Verify your identity in heading', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(AuthenticateComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#title').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.verifyYourIdentity.verifyYourIdentityHeader);
  }));

  // Testcase to check if screen subtitle is 'Enter the code we texted to the number on your profile'
  it('should render Enter the code we texted to the number on your profile in subheading.', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    let resp: APIResponse = {
      output: {
        sessionId: 'KKD342FJ',
        twoFAEnabled: false,
        trustDevice: false,
        fclCookie: 'Afs4354',
        contactNameCookie: 'Snehal Patil',
        nameCookie: 'Snehal',
        uuidCookie: 'YYq5TN9Qe2',
        /*loginCookieOutputVO: {
          fclCookie: '10027.9d91.40d0134c6316807047c32b21ff445c56',
          nameCookie: 'Snehal',
          contactNameCookie: 'Snehal Patil',
          uuidCookie: 'YYq5TN9Qe2'
        },*/
        verificationMethods: [
          {
            deliveryMethod: 'SMS',
            address: '###-###-234',
            primary: true
          }
        ]
      }
    };
    sharedService.apiResponse = resp;
    component.ngOnInit();
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#SubtitleNumberOne').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.verifyYourIdentity.SubtitleNumberOne);
    expect(element.querySelector('#SubtitleNumberTwo').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.verifyYourIdentity.SubtitleNumberTwo);
  }));

  // Testcase to check if screen subtitle is 'Enter the code we sent to the email on your profile'
  it('should render Enter the code we sent to the email on your profile in subheading.', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    let apiResp: APIResponse = {
      output: {
        sessionId: 'KKD342FJ',
        twoFAEnabled: false,
        trustDevice: false,
        fclCookie: 'Afs4354',
        contactNameCookie: 'Snehal Patil',
        nameCookie: 'Snehal',
        uuidCookie: 'YYq5TN9Qe2',
       /* loginCookieOutputVO: {
          fclCookie: '10027.9d91.40d0134c6316807047c32b21ff445c56',
          nameCookie: 'Snehal',
          contactNameCookie: 'Snehal Patil',
          uuidCookie: 'YYq5TN9Qe2'
        },*/
        verificationMethods: [
          {
            deliveryMethod: 'EMAIL',
            address: '###-###-234',
            primary: true
          }
        ]
      }
    };
    sharedService.apiResponse = apiResp;
    component.ngOnInit();
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#SubtitleCallOne').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.verifyYourIdentity.SubtitleCallOne);
    expect(element.querySelector('#SubtitleCallTwo').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.verifyYourIdentity.SubtitleCallTwo);
  }));

  // Test case to check if screen subtitle is 'Enter the code we sent to the phone number on your profile'
  it('should render Enter the code we sent to the phone number on your profile.', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    let mockResp: APIResponse = {
      output: {
        sessionId: 'KKD342FJ',
        twoFAEnabled: false,
        trustDevice: false,
        fclCookie: 'Afs4354',
        contactNameCookie: 'Snehal Patil',
        nameCookie: 'Snehal',
        uuidCookie: 'YYq5TN9Qe2',
        /*loginCookieOutputVO: {
          fclCookie: '10027.9d91.40d0134c6316807047c32b21ff445c56',
          nameCookie: 'Snehal',
          contactNameCookie: 'Snehal Patil',
          uuidCookie: 'YYq5TN9Qe2'
        },*/
        verificationMethods: [
          {
            deliveryMethod: 'CALL',
            address: '###-###-234',
            primary: true
          }
        ]
      }
    };
    sharedService.apiResponse = mockResp;
    component.ngOnInit();
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#SubtitlePhoneOne').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.verifyYourIdentity.SubtitlePhoneOne);
    expect(element.querySelector('#SubtitlePhoneTwo').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.verifyYourIdentity.SubtitlePhoneTwo);
  }));

  // To check if screen If you haven’t received a code after a few minutes, you can request a new one'
  it('should display If you haven’t received a code after a few minutes, you can request a new one', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(AuthenticateComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#didntReceiveCodeSubtitle').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.verifyYourIdentity.didntReceiveCodeSubtitle);
  }));


  it('should call sendVerificationCode method for forbidden error', () => {
    spyOn(sendOtpService, 'sendVerificationCode').and.callFake(() => {
      return throwError(new Error('403'));
    });

    // const spyNavigate = spyOn(router, 'navigate').and.stub();

    component.resendVerificationCode();
    fixture.detectChanges();
    expect(sendOtpService.sendVerificationCode).toHaveBeenCalled();

  });

  // Test case to check the response in oninit method
  it('should check hide popup', () => {
    const mockResp: APIResponse = {
      output: {
        sessionId: 'KKD342FJ',
        twoFAEnabled: true,
        trustDevice: true,
        fclCookie: 'Afs4354',
        contactNameCookie: 'Lorem Ipsum',
        nameCookie: 'Ipsum',
        uuidCookie: '453dfsfff',
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
    sharedService.apiResponse = mockResp;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.apiResponse).not.toBe(null);
  });

  it('should check errorHandler success case', () => {
    const err = new HttpErrorResponse({
      error: {
        status: '400',
        errors: [{ code: 'ATTEMPT.EXCEEDED' }]
      }
    });
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
    spyOn(sendOtpService, 'sendVerificationCode').and.returnValue(of(response).pipe(delay(1)));
    spyOn(component, 'errorHandler').and.callThrough();
    component.resendVerificationCode();
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

  // Unit Test Case for Start Timer
  it('should Call "startTimer" Method', () => {
    const spyStartTime = spyOn(component, 'startTimer');
    component.startTimer();
    expect(spyStartTime).toHaveBeenCalled();
  });
});
