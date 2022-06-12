import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_liste_Modules = 'http://localhost:8081/GestionProjet/ListeModules'

const api_Ajout_Module = 'http://localhost:8081/GestionProjet/AjouterModule'

const api_Liste_Module_Projet = 'http://localhost:8081/GestionProjet/ListeModuleProjet'



@Injectable({
  providedIn: 'root'
})
export class GestionModulesService {

  constructor(private http: HttpClient) { }



  ListerTousModules() {
    return this.http.get(api_liste_Modules);
  }


  AjouterModule(id,module): Observable<any> {
    return this.http.post(`${api_Ajout_Module}/${id}`,module);
  }


  ListeModuleProjet(id): Observable<any> {
    return this.http.get(`${api_Liste_Module_Projet}/${id}`);
  }


}