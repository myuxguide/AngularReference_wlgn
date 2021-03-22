import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { LoginCredentialsComponent } from './login-credentials.component';
import { LoginCredentialService } from '../../services/login-credential/login-credential.service';
import { CookieService } from 'ngx-cookie-service';
import { CustomerSupportComponent } from '../../shared/components/customer-support/customer-support.component';
import { ForgotUseridComponent } from '../../shared/components/forgot-userid/forgot-userid.component';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';


describe('LoginCredentialsComponent', () => {
  let component: LoginCredentialsComponent;
  let fixture: ComponentFixture<LoginCredentialsComponent>;
  let router: Router;
  let configService: ConfigurationService;
  let loginCredentialService: LoginCredentialService;
  const ENGLISH_TRANSLATIONS = require('src/assets/i18n/en.json');
  let cookieService: CookieService;

  beforeAll(() => {
    configService = new ConfigurationService(null);
    configService.appConfig = { ...require('../../../assets/configs/config.json'), ...require('../../../assets/configs/level.json') };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS })],
      declarations: [LoginCredentialsComponent, CustomerSupportComponent, ForgotUseridComponent],
      providers: [{ provide: ConfigurationService, useValue: configService },
        LoginCredentialService, RouterTestingModule, CookieService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCredentialsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
    router = TestBed.inject(Router);
    cookieService = TestBed.inject(CookieService);
    loginCredentialService = TestBed.inject(LoginCredentialService);
  });

  // Test case to check status 400
  it('On click of login button should get error status 400', () => {
    const error = new HttpErrorResponse({
      error: {
        transactionId: '624deea6-b709-470c-8c39-4b5511281492',
        errors: [{ code: 'LOGIN.UNSUCCESSFUL', parameterList: [], message: 'Internal server error' }]
      }
      });
    component.errorHandler(error);
    fixture.detectChanges();
    expect(component.userNotValid).toEqual(true);
  });

  // Test case to check status 400 Exceeded
  it('On click of login button should get error status 400 Exceeded', () => {
    const err = new HttpErrorResponse({
      error: {
        transactionId: '624deea6-b709-470c-8c39-4b5511281492',
        errors: [{ code: 'LOGIN.UNSUCCESSFUL.EXCEEDED', parameterList: [], message: 'Internal server error' }]
      }
    });
    const spyNavigate = spyOn(router, 'navigate').and.stub();
    component.errorHandler(err);
    fixture.detectChanges();
    expect(spyNavigate).toHaveBeenCalledWith(['/lock']);
  });

  // Test case to check status 500
  it('On click of login button should get error status 500', () => {
    const err = new HttpErrorResponse({
      error: {
        transactionId: '624deea6-b709-470c-8c39-4b5511281492',
        errors: [{ code: 'INTERNAL.SERVER.ERROR', parameterList: [], message: 'Internal server error' }]
      }
    });
    const spyNavigate = spyOn(router, 'navigate').and.stub();
    component.errorHandler(err);
    fixture.detectChanges();
    expect(spyNavigate).toHaveBeenCalledWith(['/error']);
  });

  // Test case to check if user id field is empty and there is a validation error
  it('should check userId empty', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    let errors;
    const userId = component.loginForm.controls['userId'];
    userId.setValue('');
    component.logInSubmit();
    fixture.detectChanges();
    errors = userId.errors || {};
    expect(errors['required']).toBeTruthy();
  }));

  // Test case to check if user id field is present and no validation error
  it('should check userId not empty', () => {
    let errors;
    const userId = component.loginForm.controls['userId'];
    userId.setValue('111111');
    component.logInSubmit();
    fixture.detectChanges();
    errors = userId.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  // Test case to check if Password field is empty and there is a validation error
  it('should check Password empty', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    let errors;
    const password = component.loginForm.controls['password'];
    component.logInSubmit();
    fixture.detectChanges();
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  }));

  // Test case to check if password field is present and no validation error
  it('should check password not empty', () => {
    let errors;
    const password = component.loginForm.controls['password'];
    password.setValue('111111');
    component.logInSubmit();
    fixture.detectChanges();
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  // Test case to check if user id field is empty and there is a validation error
  it('should check userid empty', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    let errors;
    const userid = component.loginForm.controls['userId'];
    component.logInSubmit();
    fixture.detectChanges();
    errors = userid.errors || {};
    expect(errors['required']).toBeTruthy();
  }));

  // Test case to check if user id field is present and no validation error
  it('should check userid not empty', () => {
    let errors;
    const userid = component.loginForm.controls['userId'];
    userid.setValue('111111');
    component.logInSubmit();
    fixture.detectChanges();
    errors = userid.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  // Test case to check if Password field is empty and there is a validation error
  it('should check Password empty', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    let errors;
    const password = component.loginForm.controls['password'];
    component.logInSubmit();
    fixture.detectChanges();
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  }));

  // Test case to check if password field is present and no validation error
  it('should check password not empty', () => {
    let errors;
    const password = component.loginForm.controls['password'];
    password.setValue('111111');
    component.logInSubmit();
    fixture.detectChanges();
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  // to check toggle hide and show function
  it('should toggle true', () => {
    component.show = false;
    component.hideShowPass();
    component.logInSubmit();
    expect(component.show).toBe(true);
  });

  // to check toggle hide and show function
  it('should toggle false', () => {
    component.show = true;
    component.hideShowPass();
    component.logInSubmit();
    expect(component.show).toBe(false);
  });

  // To check if screen title is 'Enter Your User ID and Password to log in'
  it('should display Enter Your User ID and Password to log in heading', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(LoginCredentialsComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#title').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.loginCredentials.credentialsHeader);
  }));

  // To check if screen contains CreateOne link
  it('should display Create One link in sub title', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(LoginCredentialsComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#createOne').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.loginCredentials.createOne);
  }));

  // To check if user ID label is visible
  it('should display user ID label', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(LoginCredentialsComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#userIdLabel').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.loginCredentials.userIDLabel);
  }));

  // To check if password label is visible
  it('should display password label', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(LoginCredentialsComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#passwordLabel').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.loginCredentials.passwordLabel);
  }));

  // To check if remember me label is visible
  it('should display remember me label', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(LoginCredentialsComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#checkBoxLabel').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.loginCredentials.rememberMeLabel);
  }));

  // To check if login button is visible
  it('should display login button', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture = TestBed.createComponent(LoginCredentialsComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#login-btn').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.loginCredentials.loginButton);
  }));

  it('should construct the Create Account link', () => {
    component.getCreateAccountLink();
    fixture.detectChanges();
    expect(component.createUserIdRedirectUrl).toContain('/create-account.html');
  });

  /* // This testcase to check CreateOne functionality is working
   it('should call navigateToCreateAccount method', () => {
     spyOn(component, 'navigateToCreateAccount').and.callThrough();
     const link = fixture.debugElement.nativeElement.querySelector('#createOne');
     link.click();
     fixture.detectChanges();
     expect(component.navigateToCreateAccount).toHaveBeenCalled();
   });*/

  it('should check remember me', () => {
    const event = {
      target: {
        checked: true
      }
    };
    component.rememberMeCheck(event);
    expect(component.isRememberMe).toBe(true);
  });

  it('should check setRememberMeUserId me', () => {
    const userId = '1234567';
    component.key = 'fdx_rememberme';
    spyOn(cookieService, 'set');
    component.setRememberMeUserId(userId);
    expect(cookieService.set).toHaveBeenCalled();
  });

  // Testcase to check after successful login should navigate authenticate page if dicouple is enabled
  it('should navigate success page if dicouple is enabled', fakeAsync(() => {
    const response = {
      output: {
        transactionId: '624deea6-b709-470c-8c39-4b5511281492',
        customerTransactionId: '0e671149-016f-1000-941f-ef4dbabadd2e'
      }
    };
    component.loginForm.controls['userId'].setValue('muthu07');
    component.loginForm.controls['password'].setValue('Tamil*6951');
    spyOn(loginCredentialService, 'newValidateLogin').and.returnValue(of(response).pipe(delay(1)));
    const spyNavigate = spyOn(router, 'navigate').and.stub();
    configService.appConfig.decoupleFlag = false;
    component.logInSubmit();
    fixture.detectChanges();
    expect(loginCredentialService.newValidateLogin).toHaveBeenCalled();
    tick(1);
    expect(spyNavigate).toHaveBeenCalledWith(['/authenticate']);
  }));

  // Test case to check after successful login should have home page url should not be blank if dicouple is disabled
  it('should navigate success page if dicouple is disabled', fakeAsync(() => {
    const response = {
      output: {
        transactionId: '624deea6-b709-470c-8c39-4b5511281492',
        customerTransactionId: '0e671149-016f-1000-941f-ef4dbabadd2e'
      }
    };
    component.loginForm.controls['userId'].setValue('muthu07');
    component.loginForm.controls['password'].setValue('Tamil*6951');
    spyOn(loginCredentialService, 'newValidateLogin').and.returnValue(of(response).pipe(delay(1)));
    configService.appConfig.decoupleFlag = true;
    component.logInSubmit();
    fixture.detectChanges();
    tick(1);
    expect(component.sourceRedirectUrl).not.toBe('');
  }));
});
