import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CAAS_CONFIGURATOR, CaasConfig, FedexCaasModule, LocaleService } from '@fedex/caas';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationService } from './services/configuration/configuration.service';
import { OauthInterceptor } from './services/interceptors/oauth.interceptor';
import { SharedModule } from './shared/shared.module';
import { MockHostInterceptor } from './services/interceptors/mock.host.interceptor';
import { CommonCoreModule } from '@fedex/common-core';
import { CookieService } from 'ngx-cookie-service';
import { COUNTRY_CODE, GDL_SCRIPT_URL, GlobalDataLayerModule, LANGUAGE_CODE } from '@fedex/global-data-layer-client';

export function configCaasFactory(http: HttpClient) {
  return http.get<CaasConfig>('/assets/configs/caas.json');
}

export function configFactory(configurationService: ConfigurationService) {
  return () => {
    return new Promise((resolve, reject) => {
      configurationService.initConfigs().toPromise()
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    FedexCaasModule,
    CommonCoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),
    GlobalDataLayerModule.forRoot({
      appName: 'wlgn',
      gdlScriptUrl: {
        provide: GDL_SCRIPT_URL,
        useFactory: (configService: ConfigurationService) => `https://${configService.config.env.host}${configService.config.links.gdlUrl}`, deps: [ConfigurationService],
      },
      initializeGdl: false,
      logHttpErrorResponse: true,
      countryCode: {
        provide: COUNTRY_CODE,
        useFactory: (localeService: LocaleService) =>
          localeService.userLocale.country.code,
        deps: [LocaleService],
      },
      languageCode: {
        provide: LANGUAGE_CODE,
        useFactory: (localeService: LocaleService) =>
          localeService.userLocale.language.code,
        deps: [LocaleService],
      },
    }),

  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    TranslateStore,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      multi: true,
      deps: [ConfigurationService]
    },
    {
      provide: CAAS_CONFIGURATOR,
      useFactory: configCaasFactory,
      deps: [HttpClient]
    },
    { provide: HTTP_INTERCEPTORS, useClass: MockHostInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: OauthInterceptor, multi: true },
    CookieService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
