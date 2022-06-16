import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_list_tache = 'http://localhost:8081/GestionProjet/ListeDesTaches'

const api_ajout_tache = 'http://localhost:8081/GestionProjet/AjouterTache'

const api_list_tache_module = 'http://localhost:8081/GestionProjet/ListeDesTachesModules'

const api_list_tache_user= 'http://localhost:8081/GestionProjet/ListeDesTachesUsers'

const api_list_terminer_user= 'http://localhost:8081/GestionProjet/terminerTache'


@Injectable({
  providedIn: 'root'
})
export class GestionTacheService {

  constructor(private http: HttpClient) { }

  ListerTousTaches() {
    return this.http.get(api_list_tache);
}


AjouterTache(id, data) : Observable<any>{
    return this.http.post(`${api_ajout_tache}/${id}`,data);
}


ListeTacheModule(id) : Observable<any>{
  return this.http.get(`${api_list_tache_module}/${id}`);
}


ListeTacheUsers(id) : Observable<any>{
  return this.http.get(`${api_list_tache_user}/${id}`);
}

TerminerTache(id, data) : Observable<any>{
  return this.http.post(`${api_list_terminer_user}/${id}`,data);
}


}
