import { Component} from '@angular/core';
import { version } from '../../../environments/version';
@Component({
  selector: 'wlgn-version',
  template: ` <pre>{{version | json}}</pre> `
})
export class InfoComponent {

  public readonly version = version;

  constructor() {}
}
