import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const login = 'http://localhost:8081/GestionProjet/sign-in'



@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http : HttpClient, private router : Router) { }

  isLoggedIn(){
    let token = localStorage.getItem('token') || sessionStorage.getItem("token");
    if(token){
      return true
    }else{
      return false
    }
  }

  login(credentials) {
    return this.http.post(login,credentials);
  }

  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('id');

  }


  getToken(): string {
    return localStorage.getItem('token');
  }

  getRoles(): string{
    let role = localStorage.getItem('roles');
    return role;
  }
  
  getId(): string{
    let id = localStorage.getItem('id');
    return id;
  }


}
