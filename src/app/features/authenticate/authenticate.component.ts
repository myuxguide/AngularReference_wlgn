import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogPageView } from '@fedex/global-data-layer-client';
import { HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from '../../shared/models/Response';
import { SendOtpService } from '../../services/send-otp/send-otp.service';
import { SharedService } from '../../shared/services/shared.service';


@LogPageView({ page: 'code entry' })
@Component({
  selector: 'wlgn-authenticate',
  templateUrl: './authenticate.component.html'
})

export class AuthenticateComponent implements OnInit {

  authenticationModalFlag: boolean;
  verificationAddress: string;
  apiResponse: APIResponse;
  verificationMethod: string;
  @Input() hideText = false;

  constructor(
    private router: Router,
    private sendOtpService: SendOtpService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.isNavigatingToLoginScreen = true;
    window.scrollTo(0, 0);
    this.startTimer();
    if (this.sharedService.apiResponse != null) {
      this.apiResponse = this.sharedService.apiResponse;
      this.apiResponse.output.verificationMethods.forEach(item => {
        if (item.primary) {
          this.verificationMethod = item.deliveryMethod;
          this.verificationAddress = item.address;
        }
      });
    }
  }

  // Method to open Popup
  openPopUp(): void {
    this.authenticationModalFlag = true;
  }

  // Method to close Popup
  hidePopup(event: boolean): void {
    this.authenticationModalFlag = event;
  }

  // Resend Verification code
  resendVerificationCode(): void {
    const resendRequestData = {
      'UUID': this.sharedService.apiResponse.output.uuidCookie,
      'sessionId': this.sharedService.apiResponse.output.sessionId,
      'deliveryMethod': this.verificationMethod
    };
    this.sendOtpService.sendVerificationCode(resendRequestData).subscribe(data => {
    }, (error) => {
      this.errorHandler(error);
    });
  }

  // Handle Error Response
  errorHandler(errorResponse: HttpErrorResponse): void {
    if (errorResponse.error.errors) {
      if (errorResponse.error.errors[0].code === 'ATTEMPT.EXCEEDED') {
        this.sharedService.isNavigatingToLoginScreen = false;
        this.router.navigate(['/fail']);
        this.sharedService.stopTimer();
      }
    }
  }

  startTimer() {
    this.sharedService.startTimer();
  }
}
