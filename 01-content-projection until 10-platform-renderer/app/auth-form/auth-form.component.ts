import {
	Component,
	Output,
	EventEmitter,
	ContentChild,
	ViewChild,
	ViewChildren,
	AfterContentInit,
	AfterViewInit,
	ContentChildren,
	QueryList,
	ChangeDetectorRef,
	ElementRef,
	Renderer
} from '@angular/core';
import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

import { User } from './auth-form.interface';

@Component({
	selector: 'auth-form',
	styles:
		[
			`
    .email {
      border-color: #9f72e6;
    }
    `
		],
	template:
		`
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel #email>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select="auth-remember"></ng-content>
        <auth-message
        [style.display]="(showMessage ? 'inherit' : 'none')">
        </auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {
	showMessage: boolean;

	// @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;

	@ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;

	// @ViewChild(AuthMessageComponent) message: AuthMessageComponent;

	@ViewChild('email') email: ElementRef;

	@ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>;

	@Output() submitted: EventEmitter<User> = new EventEmitter<User>();

	constructor(private changeDetector: ChangeDetectorRef, private renderer: Renderer) {}

	ngAfterViewInit() {
		// this.message.days = 30; // Exception: Expression has changed after it was checked

		// the ViewChildren is only available inside this ngAfterViewInit lifecycle hook

		// console.log(this.email);

		// // Below code is safe for the web
		// this.email.nativeElement.setAttribute('placeholder', 'Enter your email address');
		// this.email.nativeElement.classList.add('email');
		// this.email.nativeElement.focus();

		// Below code is platform-agnostic
		this.renderer.setElementAttribute(this.email.nativeElement, 'placeholder', 'Enter your email address');
		this.renderer.setElementClass(this.email.nativeElement, 'email', true);
		this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');

		if (this.message) {
			this.message.forEach((message) => {
				message.days = 28;
			});
			this.changeDetector.detectChanges();
		}
	}

	ngAfterContentInit() {
		// if (this.message) {
		// 	this.message.days = 29;
		// }
		if (this.remember) {
			this.remember.forEach((item) => {
				item.checked.subscribe((checked: boolean) => {
					this.showMessage = checked;
				});
			});
			// this.remember.checked.subscribe((checked: boolean) => {
			// 	this.showMessage = checked;
			// });
		}
	}

	onSubmit(value: User) {
		this.submitted.emit(value);
	}
}
