import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { APIResponse } from '../models/Response';
import { WindowRef } from '../../util/window.ref';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { LocaleService } from '@fedex/caas';
import { User } from '../models/User';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public isNavigatingToLoginScreen = true;
  public isAccountLocked = false;
  public isLockPage = false;
  sourceRedirectUrl: string;
  public userParams: User;

  private responseSource = new BehaviorSubject<APIResponse>(null);
  apiResponse$ = this.responseSource.asObservable();
  timerSource: any;

  constructor(
    private configService: ConfigurationService,
    private localeService: LocaleService
  ) { }

  // Method to set response
  set apiResponse(apiResponse: APIResponse) {
    this.responseSource.next(apiResponse);
  }

  // Returns an apiResponse from response source
  get apiResponse(): APIResponse {
    return this.responseSource.getValue();
  }

  setParams(params: User): void {
    this.userParams = params;
  }

  getParams(): User {
    return this.userParams;
  }

  // Redirect to Fedex Home Page
  public redirectToFedexHomePage() {
    this.sourceRedirectUrl = `https://${this.configService.config.env.host}${this.configService.config.links.homeUrl}`;
    this.sourceRedirectUrl = this.localeService.interpolate(this.sourceRedirectUrl);
    WindowRef.nativeWindow.location.href = this.sourceRedirectUrl;
  }

  startTimer() {
    // Requirement is for 67mins
    // const source = timer(4020000); // 67 mins or 4020000 ms
    // Testing purpose making timer for 5min
    const source = timer(300000); // 5 mins or 300000 ms
    this.timerSource = source.subscribe(() => {
      this.timeoutOccurred();
    });
  }

  stopTimer() {
    if (!this.timerSource.closed) {
      this.timerSource.unsubscribe();
    }
  }

  timeoutOccurred() {
    let timeoutRedirectUrl = `https://${this.configService.config.env.host}${this.configService.config.links.homeUrl}`;
    timeoutRedirectUrl = this.localeService.interpolate(timeoutRedirectUrl);
    WindowRef.nativeWindow.open(timeoutRedirectUrl, '_self');
  }

}
