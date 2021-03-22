import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PopupComponent} from './popup.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AlertService} from '../../services/alert.service';
import {By} from '@angular/platform-browser';

describe('PopupComponent', () => {
    let component: PopupComponent;
    let fixture: ComponentFixture<PopupComponent>;
    let alertService: AlertService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [PopupComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopupComponent);
        component = fixture.componentInstance;
        alertService = TestBed.inject(AlertService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close popup on clicking x', fakeAsync(() => {
        alertService.alert('test');
        tick();
        expect(component.show).toBe(true);
        component.closePopup();
        expect(component.show).toBe(false);
    }));

    it('should show popup in the dom', fakeAsync(() => {
        let el = fixture.debugElement.query(By.css('#wlgn-popup'));
        expect(el).toBeFalsy();

        alertService.alert('message');
        fixture.detectChanges();
        tick();
        el = fixture.debugElement.query(By.css('#wlgn-popup'));
        expect(el).toBeTruthy();

        fixture.debugElement.query(By.css('button')).nativeElement.click();
        fixture.detectChanges();
        tick();
        el = fixture.debugElement.query(By.css('#wlgn-popup'));
        expect(el).toBeFalsy();
    }));


});
