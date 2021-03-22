import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Bypass '/assets/*' requests from being intercepted
 */
export abstract class BypassAssetsInterceptor implements HttpInterceptor {
  private readonly ASSETS_REGEX = /\/?assets\/.?/;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.ASSETS_REGEX.test(req.url)) return next.handle(req);
    return this.interceptInternal(req, next);
  }

  /**
   * Called when the request is NOT an '/assets/*' request
   */
  abstract interceptInternal(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
