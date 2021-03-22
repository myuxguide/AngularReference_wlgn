import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../../shared/models/Response';

@Injectable({
  providedIn: 'root'
})
export class LoginCredentialService {
  // ValidateLogin V2 API url
  private validateLoginUrl = '/user/v2/login/validate';

  private newValidateLoginUrl = '/user/v2/login/validateLogin';

  constructor(private http: HttpClient) {  }

  // login on login button clicked
  validateLogin(userParams): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.validateLoginUrl, userParams);
  }

  // validateLogin on test link clicked
  newValidateLogin(userParams): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.newValidateLoginUrl, userParams);
  }
}
