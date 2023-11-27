import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../Services/Users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private _usersService: UsersService, private router: Router){}

  canActivate():boolean{
    if(this._usersService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['login'])
      alert("צריך להתחבר בשביל להגיע לאיזור המבוקש")
      return false;
    }

  }
}
   

