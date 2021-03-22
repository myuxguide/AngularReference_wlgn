import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, merge, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Configuration object type
 */
interface Config {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class ConfigurationService {
  public appConfig: Config = {};
  constructor(private http: HttpClient) {
  }

  initConfigs(): Observable<void | object> {

    const configFiles = ['/assets/configs/config.json', '/assets/configs/oauth.json', '/assets/configs/level.json'];
    const configs: Observable<void | object>[] = configFiles.map(url =>
      this.http.get(url).pipe(
        map(config => this.withConfig(config)),
        catchError(err => {
          if (err instanceof HttpErrorResponse && err.status === 404) return EMPTY;
          else { throwError(err); }
        })
      ));
    return merge(...configs);
  }

  withConfig(...configs: Config[]) {
    configs.forEach(config => (this.appConfig = { ...this.appConfig, ...config }));
  }

  get config(): Config {
    return this.appConfig;
  }
}
