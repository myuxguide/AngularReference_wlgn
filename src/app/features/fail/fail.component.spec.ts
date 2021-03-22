import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FailComponent } from './fail.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerSupportComponent } from 'src/app/shared/components/customer-support/customer-support.component';
import { Router } from '@angular/router';

describe('FailComponent', () => {
  let component: FailComponent;
  let fixture: ComponentFixture<FailComponent>;
  let configService: ConfigurationService;
  let router: Router;
  const ENGLISH_TRANSLATIONS = require('src/assets/i18n/en.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailComponent, CustomerSupportComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, TranslateTestingModule.withTranslations({ en: ENGLISH_TRANSLATIONS })],
      providers: [{ provide: ConfigurationService, useValue: configService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Testcase to check if header is available'
  it('should display header', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#fail-title').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.fail.header);
  }));

  // Testcase to check if 'tryagain' button is available'
  it('should display tryagain button', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#try-again').textContent.trim()).toBe(ENGLISH_TRANSLATIONS.fail.tryAgainButton);
  }));

  // Testcase to check 'tryagain' button click event
  it('should call tryagain method', () => {
    const spyNavigate = spyOn(router, 'navigate').and.stub();
    component.navigateToHomePage();
    fixture.detectChanges();
    expect(spyNavigate).toHaveBeenCalled();
  });

});


