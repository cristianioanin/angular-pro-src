import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterContentInit } from '@angular/core';
import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
	selector: 'app-root',
	template:
		`
    <div>
      <auth-form 
        (submitted)="createUser($event)">
        <h3>Create account</h3>
        <button type="submit">
          Join Us
        </button>
      </auth-form>
      <auth-form 
        (submitted)="loginUser($event)">
        <h3>Login</h3>
        <auth-remember 
          (checked)="rememberUser($event)">
        </auth-remember>
        <button type="submit">
          Login
        </button>
      </auth-form>
    </div>
    <h2>Insert a component dinamically</h2>
    <div>
      <div #entry>
        <h3>Login - dynamically :P</h3>
        <auth-remember 
          (checked)="rememberUser($event)">
        </auth-remember>
        <button type="submit">
          Login
        </button>
      </div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {
	rememberMe: boolean = false;

	@ViewChild('entry', { read: ViewContainerRef })
	entry: ViewContainerRef;

	constructor(private resolver: ComponentFactoryResolver) {}

	ngAfterContentInit() {
		const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
		const component = this.entry.createComponent(authFormFactory);
	}

	rememberUser(remember: boolean) {
		this.rememberMe = remember;
	}

	createUser(user: User) {
		console.log('Create account', user);
	}

	loginUser(user: User) {
		console.log('Login', user, this.rememberMe);
	}
}
