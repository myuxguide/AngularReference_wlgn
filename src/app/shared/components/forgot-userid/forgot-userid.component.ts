import { Component, OnInit } from '@angular/core';
import { WindowRef } from '../../../util/window.ref';

@Component({
  selector: 'wlgn-forgot-userid',
  templateUrl: './forgot-userid.component.html'
})
export class ForgotUseridComponent implements OnInit {

  private static readonly WUPRLINK = 'http://wupr-release.app.clwdev1.paas.fedex.com/';
  private forgotLoginPasswordUrl: string;

  constructor() {
  }

  ngOnInit(): void { }

  getForgotPasswordLink() {
    this.forgotLoginPasswordUrl = ForgotUseridComponent.WUPRLINK;
    // this.forgotLoginPasswordUrl = `https://${this.configService.config.env.host}${this.configService.config.links.wupr};
  }

  // Navigation to WUPR URL
  navigateToLoginSolutions() {
    this.getForgotPasswordLink();
    WindowRef.nativeWindow.location.href = this.forgotLoginPasswordUrl;
  }
}
