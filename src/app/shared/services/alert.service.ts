import {Injectable} from '@angular/core';
import {isObservable, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AlertService {
  private alert$ = new Subject<string>();
  alertEvent$ = this.alert$.asObservable();

  constructor() {
  }

  alert(message: Observable<string> | string) {
    if (isObservable(message)) {
      (message as Observable<string>).subscribe(msg => this.alert$.next(msg));
    } else {
      this.alert$.next(message as string);
    }
  }
}
