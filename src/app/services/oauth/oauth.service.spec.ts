import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpBackend, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EMPTY, of, throwError } from 'rxjs';
import { OauthService } from './oauth.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { OAuthToken } from '../../shared/models/OAuthToken';

const stubToken: OAuthToken = {
  access_token: '000xAAA',
  scope: 'foo',
  token_type: 'bar',
  expires_in: 3600
};

describe('OauthService', () => {
  let service: OauthService;
  let config: ConfigurationService;
  let backendMock: HttpBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(OauthService);
    config = TestBed.inject(ConfigurationService);
    backendMock = TestBed.inject(HttpBackend);

    config = TestBed.inject(ConfigurationService);
    config.appConfig = {
      ...require('../../../assets/configs/level.json'),
      ...require('../../../assets/configs/oauth.json'),
      ...require('../../../assets/configs/caas.json'),
      ...require('../../../assets/configs/config.json')
    };
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should rectify oauth token to include instant when token expires', () => {
    const expiresInSeconds = 60; // 1 minute
    const token: OAuthToken = {...stubToken, ...{expires_in: expiresInSeconds}};

    const rectifiedToken = service.rectify(token);
    expect(rectifiedToken).toEqual(jasmine.objectContaining(token));

    const now = new Date();
    const fromNow = new Date(now.getTime() + (expiresInSeconds * 1000));
    expect(rectifiedToken.expires_at).toBeGreaterThan(now.getTime());
    expect(rectifiedToken.expires_at).toBeLessThanOrEqual(fromNow.getTime());
  });

  it('should be "true" when asserting if null token is expired', () => {
    expect(service.isExpired(null)).toBeTruthy();
    expect(service.isExpired(undefined)).toBeTruthy();
  });

  it('should be "true" when asserting a token with an expires_at in the past', () => {
    const past = new Date(new Date().getTime() - (stubToken.expires_in * 2 * 1000));
    const token: OAuthToken = {...stubToken, ...{expires_at: past.getTime()}};

    expect(service.isExpired(token)).toBeTruthy();
  });

  it('should be "false" when asserting a token with an expires_at in the future', () => {
    const future = new Date(new Date().getTime() + (stubToken.expires_in * 2 * 1000));
    const token: OAuthToken = {...stubToken, ...{expires_at: future.getTime()}};

    expect(service.isExpired(token)).toBeFalsy();
  });

  /**
   * Tests do not use HttpTestingController because HttpBackend is injected to bypass interceptors so an alternative
   * testing pattern was used
   */
  describe('with mock backend', () => {
    it('should fetch token from the back-end only once within expiration period', () => {
      const spyHandle = spyOn(backendMock, 'handle').and.returnValue(of(new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: stubToken
      })));

      service.readOauthToken$().toPromise().then(token => expect(token).toEqual(jasmine.objectContaining(stubToken)));
      service.readOauthToken$().toPromise().then(token => expect(token).toEqual(jasmine.objectContaining(stubToken)));

      expect(spyHandle).toHaveBeenCalledTimes(1);
      expect(spyHandle).toHaveBeenCalledWith(jasmine.objectContaining({
        url: 'https://apidev.idev.fedex.com/auth/oauth/v2/token'
      }));
    });

    it('should re-fetch token from back-end if token is expired', () => {
      const spyHandle = spyOn(backendMock, 'handle').and.returnValue(of(new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: stubToken
      })));
      spyOn(service, 'isExpired').and.returnValue(true);
      service.readOauthToken$().toPromise();

      expect(spyHandle).toHaveBeenCalledTimes(1);
      expect(spyHandle).toHaveBeenCalledWith(jasmine.objectContaining({
        url: 'https://apidev.idev.fedex.com/auth/oauth/v2/token'
      }));
    });

    it('should not fetch token from back-end if token IS expired', () => {
      const spyHandle = spyOn(backendMock, 'handle').and.returnValue(EMPTY);
      spyOn(service, 'isExpired').and.returnValue(false);
      service.readOauthToken$().toPromise();

      expect(spyHandle).not.toHaveBeenCalled();
      expect(spyHandle).not.toHaveBeenCalledWith(jasmine.objectContaining({
        url: 'https://apidev.idev.fedex.com/auth/oauth/v2/token'
      }));
    });

    it('should retry fetch of token on back-end error', () => {
      const spyHandle = spyOn(backendMock, 'handle').and.returnValues(...[
        throwError(new HttpErrorResponse({
          status: 500,
          statusText: 'Internal Server Error'
        })),
        of(new HttpResponse({
          status: 200,
          statusText: 'OK',
          body: stubToken
        }))
      ]);
      service.readOauthToken$().toPromise();

      expect(spyHandle).toHaveBeenCalledTimes(2);
      expect(spyHandle).toHaveBeenCalledWith(jasmine.objectContaining({
        url: 'https://apidev.idev.fedex.com/auth/oauth/v2/token'
      }));
    });

    it('should rectify back-end tokens to include "expires_at"', () => {
      const spyHandle = spyOn(backendMock, 'handle').and.returnValue(of(new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: stubToken
      })));

      service.readOauthToken$().subscribe(token => expect(token.expires_at).toBeTruthy());

      expect(spyHandle).toHaveBeenCalledTimes(1);
      expect(spyHandle).toHaveBeenCalledWith(jasmine.objectContaining({
        url: 'https://apidev.idev.fedex.com/auth/oauth/v2/token'
      }));
    });
  });
});
