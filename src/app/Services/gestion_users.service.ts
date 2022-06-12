
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const liste_Users = 'http://localhost:8081/GestionProjet/Liste_Users'

const suppUser = 'http://localhost:8081/GestionProjet/Supprimer_User'

const api_Ajout_User = 'http://localhost:8081/GestionProjet/Ajouter_User'

const api_Modifier_User = 'http://localhost:8081/GestionProjet/Modifier_User'

const api_listeChef_Projet = 'http://localhost:8081/GestionProjet/listeChefProjet'

const api_listeMembrEquipe = 'http://localhost:8081/GestionProjet/listeMembreEquipe'


@Injectable({
  providedIn: 'root'
})
export class GestionUsersService {

  constructor(private http: HttpClient) { }



  ListerTousUsers() {
    return this.http.get(liste_Users);
  }

  SupprimerUser(id): Observable<any> {
    return this.http.delete(`${suppUser}/${id}`);
  }

  AjouterUser(user): Observable<any> {
    return this.http.post(api_Ajout_User, user);

  }


  ModifierUser(id,utilisateur): Observable<any> {
    return this.http.put(`${api_Modifier_User}/${id}`,utilisateur);
  }


  ListerTousChefProjet() {
    return this.http.get(api_listeChef_Projet);
  }


  
  ListerMembreEquipe() {
    return this.http.get(api_listeMembrEquipe);
  }


}
