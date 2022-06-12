import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthentificationService } from './Services/authentification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  constructor( public authService: AuthentificationService, private router : Router)  { }
  
  opened = true;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  getRoles()
  {
    const role = localStorage.getItem("roles");
  }


  ngOnInit() {
    this.getRoles();
    console.log(window.innerWidth
      )
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }



  logout()
  {
    if(this.sidenav.opened)
    {
      this.sidenav.close();
      this.authService.logout();
      this.router.navigate(['/GestionProjet/login']); 
    }
    else
    this.authService.logout();
    this.router.navigate(['/GestionProjet/login']); 

  }


  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }



}