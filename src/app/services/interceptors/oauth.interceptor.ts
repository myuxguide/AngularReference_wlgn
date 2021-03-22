import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OauthService } from '../oauth/oauth.service';
import { BypassAssetsInterceptor } from './bypass.assets.interceptor';
import { OAuthToken } from '../../shared/models/OAuthToken';


const VALIDATEPATH = '/user/v2/login/validate';
/**
 * Adds API gateway OAuth token into request headers.
 */
@Injectable({
  providedIn: 'root'
})
export class OauthInterceptor extends BypassAssetsInterceptor implements HttpInterceptor {

  private readonly CLIENT_ID: string = 'WLGN';
  private readonly CLIENT_ID_WCDO: string = 'WCDO';

  constructor(private oauthService: OauthService) {
    super();
  }

  /**
   * Adds oauth authorization headers into endpoint requests.
   *
   * Do not intercept {@link OauthService} requests to prevent infinite call stack!
   */
  interceptInternal(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const pathname = req.url.split('.com')[1];
    const clientId = pathname === VALIDATEPATH ? this.CLIENT_ID_WCDO : this.CLIENT_ID;
    const oauthTokenSource = this.oauthService.readOauthToken$();
    const interceptSource = (token: OAuthToken) => {
      const headers = req.headers
        .set('content-type', 'application/json')
        .set('authorization', `${token.token_type} ${token.access_token}`)
        .set('x-clientid', clientId)
        .set('x-loggedin', 'true')
        .set('x-version', '1.0');
      return next.handle(req.clone({ headers }));
    };

    return oauthTokenSource.pipe(switchMap(interceptSource));
  }
}
