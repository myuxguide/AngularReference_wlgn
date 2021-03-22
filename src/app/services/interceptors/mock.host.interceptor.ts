import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { WindowRef } from '../../util/window.ref';
import { ConfigurationService } from '../configuration/configuration.service';
import { BypassAssetsInterceptor } from './bypass.assets.interceptor';

/**
 * Intercept backend requests and interpolates the ${api_host} parameter with either the legit host or a mocked host based on
 * configuration {mock: boolean} or a query parameter "?mock=no|off|false".
 */

@Injectable()
export class MockHostInterceptor extends BypassAssetsInterceptor {

  private isMockCache: { use: boolean };

  constructor(private config: ConfigurationService) {
    super();
  }

  public interceptInternal(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const host = this.isMock ? this.config.config.env.mock_host : `https://${this.config.config.oauth.host}` || 'https://api.fedex.com';
    const url = `${host}${req.url}`;
    return next.handle(req.clone({url}));
  }

  /**
   * Determine if mocks are enabled/disabled based on configuration or query parameter.  Query params take precedence.
   *
   * @return true if mocks are enabled, false otherwise
   */
  get isMock(): boolean {
    if (this.isMockCache) return this.isMockCache.use;

    const useMocks = this.findQueryParam('mock') || this.config.config.env.mock;
    this.isMockCache = { use: this.toBoolean(useMocks) };

    return this.isMockCache.use;
  }

  /**
   * Get the value of a query string.
   *
   * The query param is pulled form the location.href because ActivatedRoute doesn't solve the
   * params and query params until AFTER the component is rendered so they are not available during the interceptor chain.
   *
   * @param name - value key
   * @param url - to pull the value from (optional)
   */
  findQueryParam(name: string, url?: string): string | null {
    if (!name) return null;

    const href = url || WindowRef.nativeWindow.location.href;
    const paramRegex = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
    const param = paramRegex.exec(href);
    return param ? param[1] : null;
  }

  /**
   * Converts a value to boolean and handles string properties: on, yes, true, no, off, and false.
   * @param candidate - to be converted to boolean
   * @param defaultIfMissing - if the candidate is null or undefined
   * @return true if the candidate is truthy, false otherwise
   */
  toBoolean(candidate: string | number | boolean | null, defaultIfMissing = false): boolean {
    if (candidate == null) return defaultIfMissing;
    if (typeof candidate === 'boolean') return candidate;
    if (typeof candidate === 'number') return candidate !== 0;

    const lowCandidate = candidate.toLowerCase();
    if ('on' === lowCandidate || 'yes' === lowCandidate || 'true' === lowCandidate) return true;
    if ('no' === lowCandidate || 'off' === lowCandidate || 'false' === lowCandidate) return false;
    return false;
  }
}
