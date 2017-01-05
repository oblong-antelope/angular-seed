import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UserService } from '../user-service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    if(this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate([{outlets:{modal:'login'}}]);
      return false;
    }
  }
}
