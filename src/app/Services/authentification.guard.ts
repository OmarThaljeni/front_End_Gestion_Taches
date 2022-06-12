import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {

  constructor(private authService: AuthentificationService, private router: Router) {}



  canActivate(): boolean { 
      if(this.authService.isLoggedIn()) 
      return true;
  else 
      this.router.navigate(['/GestionProjet/login']);
      return false;
    }

  
}
