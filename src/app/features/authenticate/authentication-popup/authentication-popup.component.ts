import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from '../../../shared/models/Response';
import { SendOtpService } from '../../../services/send-otp/send-otp.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'wlgn-authentication-popup',
  templateUrl: './authentication-popup.component.html'
})
export class AuthenticationPopupComponent implements OnInit {
  @Input() response: APIResponse;
  @Output() hidePopup = new EventEmitter<boolean>();
  selectedMethod: string;

  constructor(private router: Router, private sendOtpService: SendOtpService, private sharedService: SharedService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  selectDeliveryMethod(method): void {
    this.selectedMethod = method;
  }

  confirm(): void {
    const otpData = {
      UUID: this.response.output.uuidCookie,
      sessionId: this.response.output.sessionId,
      deliveryMethod: this.selectedMethod
    };
    this.sendOtpService.sendVerificationCode(otpData).subscribe(data => {
      this.closePopup();
    }, (error) => {
      this.errorHandler(error);
    });
  }

  // Method to close Popup
  closePopup(): void {
    this.hidePopup.emit(false);
  }

  // Handle Error Response
  errorHandler(errorResponse: HttpErrorResponse): void {
    if (errorResponse.error.errors) {
      if (errorResponse.error.errors[0].code === 'ATTEMPT.EXCEEDED') {
        this.sharedService.isNavigatingToLoginScreen = false;
        this.router.navigate(['/fail']);
      }
    }
  }
}
