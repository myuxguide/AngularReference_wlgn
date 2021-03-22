import {Component} from '@angular/core';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'wlgn-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent {

    show = false;
    message: string;

    constructor(private alertService: AlertService) {
        this.alertService.alertEvent$.subscribe((message) => {
            this.show = true;
            this.message = message;
        });
    }

    closePopup() {
        this.show = false;
    }

    showPopup() {
        this.show = true;
    }
}
