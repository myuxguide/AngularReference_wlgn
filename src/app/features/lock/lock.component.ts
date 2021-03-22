import { Component, OnInit } from '@angular/core';
import { LogPageView } from '@fedex/global-data-layer-client';
import { SharedService } from 'src/app/shared/services/shared.service';

@LogPageView({ page: 'OneHourlock' })
@Component({
  selector: 'wlgn-lock',
  templateUrl: './lock.component.html'
})
export class LockComponent implements OnInit {

  constructor( public sharedService: SharedService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.sharedService.isAccountLocked = false;
    sessionStorage.setItem('wlgn-lock', 'true');
  }

}
