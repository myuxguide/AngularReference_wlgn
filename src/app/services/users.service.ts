import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../shared/models/Response';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private loginUrl = '/user/v2/login';

  constructor(private http: HttpClient) { }

  /**-- Method to get user LoggedIn response data  ---**/
  userLoggedInState(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.loginUrl, {withCredentials: true});
  }
}
