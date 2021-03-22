import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogPageView } from '@fedex/global-data-layer-client';

@LogPageView({ page: 'error' })
@Component({
  selector: 'wlgn-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  // handling back click on component level
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.router.navigate(['/login-credentials']);
  }

}
