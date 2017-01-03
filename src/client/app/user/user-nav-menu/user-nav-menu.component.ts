import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service/index';

/**
 * This class represents the lazy loaded LogoutModalComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-user-nav-menu',
  templateUrl: './user-nav-menu.component.html',
  styles: [`:host {
                display: block;
                padding: 0 16px;
                position: fixed;
            }

            .img-corner {
                display: block;
                max-width:125px;
                max-height:80px;
                width: auto;
                height: auto;
            }`]
})
export class UserNavMenuComponent  {}
