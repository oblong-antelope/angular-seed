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

    @ViewChild(PopoverDirective) pop :PopoverDirective;

    /**
     * Creates an instance of the UserNavMenuComponent.
     */
    constructor(private router: Router, private userService: UserService) {}


    ngAfterViewInit() {
        setTimeout(() => this.showPop(), 500);
        setTimeout(() => this.hidePop(), 3000);
    }

    /**
     * Shows the popover for the initial show
     */
    showPop() {
        this.pop.popoverTitle = 'The User Menu';
        this.pop.show();
    }

    /**
     * Hides the popover for the initial show
     */
    hidePop() {
        this.pop.popoverTitle = '';
        this.pop.hide();
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
