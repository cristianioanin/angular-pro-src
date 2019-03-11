import {
	Component,
	ViewContainerRef,
	ViewChild,
	AfterContentInit,
	ComponentFactoryResolver,
	ComponentRef,
	TemplateRef
} from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
	selector: 'app-root',
	template:
		`
    <div>
      <ng-container 
      [ngTemplateOutlet]="tmpl"
      [ngTemplateOutletContext]="context">

      </ng-container>

      <!-- <button (click)="destroyComponent()">Destroy</button> -->
        <template #tmpl let-name let-location="location">
          {{ name }} : {{ location }}
        </template>
      <!-- <button (click)="moveComponent()">Move</button> -->
    </div>
  `
})
export class AppComponent implements AfterContentInit {
	component: ComponentRef<AuthFormComponent>;
	context = {
		$implicit: 'Cristian Ioanin',
		location: 'Craiova, RO'
	};

	@ViewChild('entry', { read: ViewContainerRef })
	entry: ViewContainerRef;

	@ViewChild('tmpl') tmpl: TemplateRef<any>;

	constructor(private resolver: ComponentFactoryResolver) {}

	ngAfterContentInit() {
		// const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
		// this.entry.createComponent(authFormFactory);
		// this.component = this.entry.createComponent(authFormFactory, 0);
		// this.component.instance.title = 'Create Account';
		// this.component.instance.submitted.subscribe(this.loginUser);
		// this.entry.createEmbeddedView(this.tmpl, {
		// 	$implicit: 'Ioanin Cristian',
		// 	location: 'RO, Craiova'
		// });
	}

	// destroyComponent() {
	// 	this.component.destroy();
	// }

	moveComponent() {
		this.entry.move(this.component.hostView, 1);
	}

	loginUser(user: User) {
		console.log('Login', user);
	}
}
