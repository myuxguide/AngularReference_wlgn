import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogPageView } from '@fedex/global-data-layer-client';
import { SharedService } from 'src/app/shared/services/shared.service';

@LogPageView({ page: 'error' })
@Component({
    selector: 'wlgn-fail',
    templateUrl: './fail.component.html'
})

export class FailComponent implements OnInit {

    constructor(private router: Router, public sharedService: SharedService) { }

    ngOnInit(): void {
        window.scrollTo(0, 0);
        this.sharedService.isNavigatingToLoginScreen = true;
    }

    navigateToHomePage() {
        this.router.navigate(['/login-credentials']);
    }
}
