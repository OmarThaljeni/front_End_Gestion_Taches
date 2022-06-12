import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogInGuard implements CanActivate {

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
