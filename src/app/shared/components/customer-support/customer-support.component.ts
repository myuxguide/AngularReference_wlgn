import {Component, Input, OnInit} from '@angular/core';
import { LocaleService } from '@fedex/caas';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import {WindowRef} from '../../../util/window.ref';

@Component({
  selector: 'wlgn-customer-support',
  templateUrl: './customer-support.component.html'
})
export class CustomerSupportComponent implements OnInit {
  needHelpRedirectUrl: string;
  @Input() hideText = false;

  constructor(private configService: ConfigurationService, private localeService: LocaleService) { }

  ngOnInit(): void {}

  getCustomerSupportLink() {
    this.needHelpRedirectUrl = `https://${this.configService.config.env.host}${this.configService.config.links.customerSupportUrl}`;
    this.needHelpRedirectUrl = this.localeService.interpolate(this.needHelpRedirectUrl);
  }

  navigateToCustomerSupport() {
    this.getCustomerSupportLink();
    WindowRef.nativeWindow.open(this.needHelpRedirectUrl, '_blank');
  }
}

