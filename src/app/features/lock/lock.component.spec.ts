import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { LocaleService } from '@fedex/caas';
import { LockComponent } from './lock.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import {CustomerSupportComponent} from '../../shared/components/customer-support/customer-support.component';
import {ForgotUseridComponent} from '../../shared/components/forgot-userid/forgot-userid.component';


 describe('lockComponent', () => {
    let component: LockComponent;
    let fixture: ComponentFixture<LockComponent>;
    let configService: ConfigurationService;
    let localeService: LocaleService;
    const ENGLISH_TRANSLATIONS = require('src/assets/i18n/en.json');

    beforeAll(() => {
        configService = new ConfigurationService(null);
        configService.appConfig = { ...require('../../../assets/configs/config.json'), ...require('../../../assets/configs/level.json') };
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LockComponent, CustomerSupportComponent, ForgotUseridComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS })],
            providers: [{ provide: ConfigurationService, useValue: configService }]
        })
          .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        localeService = TestBed.inject(LocaleService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Testcase to check if header is available on screen
    it('should display yourAccountLocked-title', inject([TranslateService], (translateService: TranslateService) => {
        translateService.setDefaultLang('en');
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement;
        expect(element.querySelector('#yourAccountLocked-title').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.accountLocked.header);
    }));

    // Testcase to check if 'subtitle title' is available'
    it('should display subtitle', inject([TranslateService], (translateService: TranslateService) => {
        translateService.setDefaultLang('en');
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement;
        expect(element.querySelector('#subtitle-text').textContent.trim()).toContain('You exceeded the maximum number of failed login attempts. We have locked your account to prevent unauthorized access. You may attempt to log in again in 1 hour');
    }));

    // Testcase to check if 'needhelp gaining access to your account' text is available'
    it('should display needhelp gaining access to your account text', inject([TranslateService], (translateService: TranslateService) => {
        translateService.setDefaultLang('en');
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement;
        expect(element.querySelector('#needHelpGainingAcess').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.accountLocked.needHelp);
    }));

});
