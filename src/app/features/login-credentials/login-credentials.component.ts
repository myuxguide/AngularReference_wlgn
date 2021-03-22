import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginCredentialService } from '../../services/login-credential/login-credential.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocaleService } from '@fedex/caas';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { WindowRef } from '../../util/window.ref';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LogPageView } from '@fedex/global-data-layer-client';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../shared/models/User';

@LogPageView({ page: 'login-credentials' })
@Component({
  selector: 'wlgn-login-credentials',
  templateUrl: './login-credentials.component.html',
})
export class LoginCredentialsComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild('userId') userIdControl: ElementRef;
  @ViewChild('password') passwordControl: ElementRef;
  userNotValid = false;
  createUserIdRedirectUrl: string;
  isRememberMe = false;
  key = 'fdx_rememberme';
  show = false;
  sourceRedirectUrl: string;

  constructor(
    public formBuilder: FormBuilder,
    private loginCredentialService: LoginCredentialService,
    private router: Router,
    public cookieService: CookieService,
    private configService: ConfigurationService,
    private localeService: LocaleService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
    const rememberMeUserId = this.cookieService.get(this.key) || '';
    if (rememberMeUserId) {
      this.loginForm.patchValue({ userId: rememberMeUserId });
    }
    this.sharedService.isLockPage = true;

  }

  // function to hide and show password
  hideShowPass() {
    this.show = !this.show;
  }
  // login button feature
  logInSubmit() {
    this.userNotValid = false;
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.controls[key].markAllAsTouched();
      });
      if (this.loginForm.controls['userId'].invalid) {
        this.userIdControl.nativeElement.focus();
      } else if (this.loginForm.controls['password'].invalid) {
        this.passwordControl.nativeElement.focus();
      }
    } else {
      this.sharedService.isNavigatingToLoginScreen = false;
      if (this.configService.appConfig.decoupleFlag) {
        this.callExistingAPI();
      } else {
        this.callNewAPI();
      }
    }
  }

  callExistingAPI(): void {
    const userParams = new User({
      userName: this.loginForm.get('userId').value,
      password: this.loginForm.get('password').value,
    });
    this.loginCredentialService.validateLogin(userParams).subscribe(
      (response) => {
        this.sharedService.setParams(userParams);
        if (this.isRememberMe) {
          this.setRememberMeUserId(userParams.userId);
        }
        this.sharedService.redirectToFedexHomePage();
      }, (error) => {
        this.errorHandler(error);
      });
  }

  callNewAPI(): void {
    const userParams = new User({
      userName: this.loginForm.get('userId').value,
      password: this.loginForm.get('password').value,
      deviceId: 'staticone'
    });
    this.loginCredentialService.newValidateLogin(userParams).subscribe(
      (response) => {
        this.sharedService.apiResponse = response;
        this.sharedService.isNavigatingToLoginScreen = false;
        this.sharedService.setParams(userParams);
        if (this.isRememberMe) {
          this.setRememberMeUserId(userParams.userId);
        }
        this.router.navigate(['/authenticate']);
      }, (error) => {
        this.errorHandler(error);
      });
  }
  // Handling error response
  errorHandler(errorResponse: HttpErrorResponse): void {
    if (errorResponse.error.errors) {
      switch (errorResponse.error.errors[0].code) {
        case 'LOGIN.UNSUCCESSFUL':
        case 'LOGIN.UNSUCCESSFUL.LASTATTEMPT': {
          this.userNotValid = true;
          break;
        }
        case 'LOGIN.UNSUCCESSFUL.EXCEEDED': {
          this.sharedService.isAccountLocked = true;
          this.router.navigate(['/lock']);
          break;
        }
        default: {
          this.router.navigate(['/error']);
          break;
        }
      }
    }
  }

  // Below functions are for remember me feature
  setRememberMeUserId(userId: string): void {
    this.cookieService.set(this.key, userId, null, null, null, null, null);
  }

  rememberMeCheck(e): void {
    this.isRememberMe = e.target.checked;
  }

  getCreateAccountLink(): void {
    this.createUserIdRedirectUrl = `https://${this.configService.config.env.host}${this.configService.config.links.createAccountUrl}`;
    this.createUserIdRedirectUrl = this.localeService.interpolate(
      this.createUserIdRedirectUrl
    );
  }

  // Method to navigate Create Account page
  navigateToCreateAccount(): void {
    this.getCreateAccountLink();
    WindowRef.nativeWindow.location.href = this.createUserIdRedirectUrl;
  }
}
