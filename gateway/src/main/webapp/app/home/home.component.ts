import { Component, OnInit } from '@angular/core';

import { LoginService, Principal, Account } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;

    constructor(private principal: Principal, private loginService: LoginService) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.loginService.login();
    }
}
