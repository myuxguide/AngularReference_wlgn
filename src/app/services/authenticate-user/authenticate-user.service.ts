import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../../shared/models/Response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateUserService {
  private validateLoginPinUrl = '/user/v1/login/pin/validate';

  constructor(private http: HttpClient) { }

  verifyOtp(verifyOtpRequest): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.validateLoginPinUrl, verifyOtpRequest);
  }

}
