import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { catchError, finalize, map, retry, share, switchMap, take, tap, timeout } from 'rxjs/operators';
import { ConfigurationService } from '../configuration/configuration.service';
import { OAuthToken } from '../../shared/models/OAuthToken';

/**
 * Retrieves OAuth tokens for accessing resources behind the API gateway.
 */
@Injectable({
  providedIn: 'root'
})
export class OauthService {
  static readonly EXPIRE_TOKEN_SECONDS = 3_600;
  private token: OAuthToken;

  private isPending = false;
  private activeTokenReader$ = new Observable<OAuthToken>();

  private http: HttpClient;

  constructor(private backend: HttpBackend,
              private config: ConfigurationService) {
    // bypass interceptors
    this.http = new HttpClient(this.backend);
  }

  /**
   * Adds 'expires-at' value which converts expiration duration to instant
   * @param token - to be rectified
   */
  rectify(token: OAuthToken): OAuthToken {
    if (token == null) return undefined;

    const duration = token.expires_in || OauthService.EXPIRE_TOKEN_SECONDS;
    const instant = (new Date()).getTime() + (duration * 1000);
    return {...token, ...{expires_at: instant}};
  }

  /**
   * Determines if the token has expired
   * @param token - to check expiration
   * @return true if the token 'expire_at' is greater than 'now', false otherwise
   */
  isExpired(token: OAuthToken): boolean {
    return (token == null || ((token.expires_at || 0) < (new Date()).getTime()));
  }

  /**
   * @return cached token if it is not expired, otherwise a new token is fetched and cached
   * @see _apiPostToken$
   */
  readOauthToken$(): Observable<OAuthToken> {
    if (this.isExpired(this.token)) {
      if (this.isPending) return this.activeTokenReader$;
      else {
        this.isPending = true;
        this.activeTokenReader$ = this._apiPostToken$().pipe(
          take(1),
          share(),
          tap(token => this.token = token),
          finalize(() => this.isPending = false)
        );
        return this.activeTokenReader$;
      }
    }
    return of(this.token);
  }

  /**
   * Fetch the API gateway token from back-end
   *
   * @return fetched token
   */
  _apiPostToken$(): Observable<OAuthToken> {

    const configSource = of({
      host: this.config.config.oauth.host,
      url: this.config.config.endpoints.oauth.url,
      timeout: this.config.config.endpoints.oauth.timeout,
      retry: this.config.config.endpoints.oauth.retry,
      grant_type: this.config.config.oauth.grant_type,
      client_id: this.config.config.oauth.client_id,
      client_secret: this.config.config.oauth.client_secret
    });

    const httpSource = (config) => {
      const url = `https://${config.host}${config.url}`;
      const body = new HttpParams()
        .set('grant_type', config.grant_type)
        .set('client_id', config.client_id)
        .set('client_secret', config.client_secret);

      return this.http.post(url, body).pipe(
        timeout(config.timeout),
        map(this.rectify),
        catchError(err => throwError(err)),
        retry(config.retry),
      );
    };

    return configSource.pipe(switchMap(httpSource));
  }

}
