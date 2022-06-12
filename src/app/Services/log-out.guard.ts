import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LogOutGuard implements CanActivate {

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return true
    }
    else {
      return false
    }


  }

}
