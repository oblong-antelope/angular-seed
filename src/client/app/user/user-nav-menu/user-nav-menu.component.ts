import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service/index';
import { PopoverDirective } from 'ng2-bootstrap';

/**
 * This class represents the lazy loaded LogoutModalComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-user-nav-menu',
  templateUrl: './user-nav-menu.component.html',
  styleUrls: ['./user-nav-menu.component.css']
})
export class UserNavMenuComponent implements AfterViewInit {

    ishome : boolean = false;

    @ViewChild(PopoverDirective) pop :PopoverDirective;

    /**
     * Creates an instance of the UserNavMenuComponent.
     */
    constructor(private router: Router,
                private userService: UserService) {}


    /**
     * Run after the view has initialised,
     * If we are on the home page, popup should show by default
     */
    ngAfterViewInit() {
        if(this.router.url === '/') {
            this.ishome = true;
            setTimeout(() => this.pop.show(), 1000);
        }
    }

    /**
     * Navigates back to the home page
     */
    home() {
        this.pop.hide();
        this.router.navigate(['']);
    }

    /**
     * Brings up the login modal
     */
    login() {
        this.pop.hide();
        this.router.navigate([{outlets:{modal:'login'}}]);
    }

    /**
     * Brings up the login modal
     */
    logout() {
        this.pop.hide();
        this.router.navigate([{outlets:{modal:'logout'}}]);
    }

    /**
     * Returns whether a user is logged in or not
     */
    isloggedin() {
        return this.userService.isLoggedIn();
    }

    /**
     * Brings up the user's profile page.
     */
    profile() {
        this.pop.hide();
        if(this.userService.isLoggedIn()) {
            let id = this.userService.getId();
            this.router.navigate(['user/', id, 'profile']);
        }
    }
}
