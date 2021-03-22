import { OauthInterceptor } from './oauth.interceptor';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OauthService } from '../oauth/oauth.service';
import { OAuthToken } from '../../shared/models/OAuthToken';

const stubOathToken: OAuthToken = {
  access_token: '000xxx000',
  expires_in: 3600,
  scope: 'unit_test',
  token_type: 'Bearer'
};

describe('OauthInterceptor', () => {
  let interceptor: OauthInterceptor;
  let service: OauthService;

  describe('with OauthService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          {provide: HTTP_INTERCEPTORS, useClass: OauthInterceptor, multi: true},
          {provide: OauthService, useClass: OauthService}
        ]
      }).compileComponents();

      interceptor = TestBed.inject(OauthInterceptor);
      service = TestBed.inject(OauthService);
    });

    it('should inject oauth headers', (done) => {
      const spyOauthService = spyOn(service, 'readOauthToken$').and.returnValue(of(stubOathToken));
      const mockRequest = new HttpRequest('GET', '/api.endpoint.json');
      const mockHandler: HttpHandler = {
        handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
          try {
            expect(req.headers.get('content-type')).toEqual('application/json');
            expect(req.headers.get('authorization')).toEqual('Bearer 000xxx000');
            expect(req.headers.get('x-clientid')).toEqual('WLGN');
            expect(req.headers.get('x-loggedin')).toEqual('true');
            expect(req.headers.get('x-version')).toEqual('1.0');
            return of(new HttpResponse({url: req.url, status: 200, statusText: 'OK'}));
          } finally {
            done();
          }
        }
      };

      interceptor.interceptInternal(mockRequest, mockHandler).subscribe(() => {
        expect(spyOauthService).toHaveBeenCalled();
      });
    });

    it('should inject oauth headers for validate request url', (done) => {
      const spyOauthService = spyOn(service, 'readOauthToken$').and.returnValue(of(stubOathToken));
      const mockRequest = new HttpRequest('GET', 'http://apidev.idev.fedex.com/user/v2/login/validate');
      const mockHandler: HttpHandler = {
        handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
          try {
            expect(req.headers.get('content-type')).toEqual('application/json');
            expect(req.headers.get('authorization')).toEqual('Bearer 000xxx000');
            expect(req.headers.get('x-clientid')).toEqual('WCDO');
            expect(req.headers.get('x-loggedin')).toEqual('true');
            expect(req.headers.get('x-version')).toEqual('1.0');
            return of(new HttpResponse({url: req.url, status: 200, statusText: 'OK'}));
          } finally {
            done();
          }
        }
      };

      interceptor.interceptInternal(mockRequest, mockHandler).subscribe(() => {
        expect(spyOauthService).toHaveBeenCalled();
      });
    });
  });
});
