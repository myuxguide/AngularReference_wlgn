import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../../shared/models/Response';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SendOtpService {
  constructor(private http: HttpClient) { }

  sendVerificationCode(otpData): Observable<APIResponse> {
    return this.http.post<APIResponse>('/user/v2/password/pin', otpData)
      .pipe(
        catchError(error => throwError(error))
      );
  }
}
