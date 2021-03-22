import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocaleService } from '@fedex/caas';
import { WindowRef } from '../../../util/window.ref';
import { AuthenticateUserService } from 'src/app/services/authenticate-user/authenticate-user.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'wlgn-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.css']
})
export class OtpFormComponent implements OnInit, AfterViewInit {

  verificationCodeForm: FormGroup;
  formSubmit = false;
  digitsStatus = {
    digit1: false,
    digit2: false,
    digit3: false,
    digit4: false,
    digit5: false,
    digit6: false
  };
  digits = Object.keys(this.digitsStatus);
  digitValidStatus = false;
  expiredAndIncorrectError = false;
  trustDevice = false;
  needHomePageUrl: string;
  questionMarkVisibility = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private el: ElementRef,
    private authenticateUserService: AuthenticateUserService,
    private sharedService: SharedService,
    private localeService: LocaleService,
    private configService: ConfigurationService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.verificationCodeForm = this.fb.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required]
    });
  }

  trustThisDeviceCheck(e) {
    this.trustDevice = e.target.checked;
  }

 /****----- To focus first input tex tbox control when view is initialised  ---***/
  ngAfterViewInit() {
    const inputElements = this.el.nativeElement.querySelectorAll('input[type=number]');
    inputElements[0].focus();
  }

  /****---- Value change method is used to focus previous and next boxes while typing  ---***/
  onValueChange(event, index) {
    const regex = new RegExp(/^\d+$/);
    if (regex.test(event.key) || event.which === 39 || event.which === 37 || event.keyCode === 8) {
      const inputElements = this.el.nativeElement.querySelectorAll('input[type=number]');
      if ((event.target.value.length >= 1 || event.which === 39)
        && index < inputElements.length - 1 && event.which !== 37) {
        inputElements[index + 1].focus();
        inputElements[index + 1].select();
        inputElements.forEach((val, i) => {
          if (i < index && !val.value) {
            this.digitsStatus['digit' + (i + 1)] = true;
          }
        });
      } else if ((!event.target.value && index && event.keyCode === 8)
        || (event.which === 37 && index >= 0)) {
        inputElements[index - 1].focus();
        inputElements[index - 1].select();
      }
    }
  }

  /****--- Key down method to avoid to press up and down arrow   ---***/
  onKeyDown(event, index) {
    const regex = new RegExp(/^\d+$/);
    if ((event.target.value.length >= event.target.maxLength && regex.test(event.key))
      || event.which === 8 || event.which === 46) {
      this.verificationCodeForm.controls[`digit${index + 1}`].setValue('');
    } else if ((event.which === 38 || event.which === 40 || !regex.test(event.key)
      || event.target.value.length >= event.target.maxLength)
      && (event.which !== 9 && event.which !== 16)) {
      event.preventDefault();
    }
  }

  /***--- Blur event method to highlight previous empty boxes  --***/
  onBlurEvent(index) {
    const validStatus = [];
    const inputElements = this.el.nativeElement.querySelectorAll('input[type=number]');
    inputElements.forEach((val, i) => {
      if (i < index && !val.value) {
        this.digitsStatus['digit' + (i + 1)] = true;
        validStatus.push(true);
      } else {
        this.digitsStatus['digit' + (i + 1)] = false;
      }
    });
    /**** ----- To show/hide validation message on blur   ---***/
    this.digitValidStatus = !!validStatus.length;
    this.expiredAndIncorrectError = false;
  }

  /****--- Method to call after continue button click  ---**/
  verifyCodeMethod() {
    this.formSubmit = true;
    if (this.verificationCodeForm.valid) {
      /*** ---  Get OTP from all input boxes   ---**/
      const allDigitValue = [];
      const inputElements = this.el.nativeElement.querySelectorAll('input[type=number]');
      inputElements.forEach((input) => {
        allDigitValue.push(input.value);
      });
      let pin = allDigitValue.join('');
      const verifyOtpRequest = {
        UUID: this.sharedService.apiResponse.output.uuidCookie,
        sessionId: this.sharedService.apiResponse.output.sessionId,
        otp: pin,
        trustDeviceId: this.trustDevice
      };
      /*** ---- Authenticate User service call for verifying the otp pin  ---***/
      this.authenticateUserService.verifyOtp(verifyOtpRequest).subscribe((response) => {
        this.navigateToHomePage();
      }, (error) => {
        this.errorHandler(error);
      });
    }
  }

  /****----  Handling error response  ---**/
  errorHandler(errorResponse: HttpErrorResponse): void {
    if (errorResponse.error.errors) {
      switch (errorResponse.error.errors[0].code) {
        case 'PIN.EXPIRED':
        case 'PIN.INCORRECT': {
          this.verificationCodeForm.reset();
          this.expiredAndIncorrectError = true;
          break;
        }
        default: {
          this.sharedService.isNavigatingToLoginScreen = false;
          this.router.navigate(['/error']);
          break;
        }
      }
    }
  }

  getHomePageUrl() {
    this.needHomePageUrl = `https://${this.configService.config.env.host}${this.configService.config.links.homeUrl}`;
    this.needHomePageUrl = this.localeService.interpolate(this.needHomePageUrl);
  }

  navigateToHomePage() {
    this.getHomePageUrl();
    WindowRef.nativeWindow.open(this.needHomePageUrl, '_self');
  }

}

