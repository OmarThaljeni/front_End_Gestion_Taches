import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_list_projet = 'http://localhost:8081/GestionProjet/RecuperListeProjet'

const api_ajout_projet = 'http://localhost:8081/GestionProjet/AjouterProjet'

const api_modifier_projet = 'http://localhost:8081/GestionProjet/ModifierProjet'

const api_supprimer_projet = 'http://localhost:8081/GestionProjet/SupprimerProjet'





@Injectable({
    providedIn: 'root'
})
export class GestionProjetService {

    constructor(private http: HttpClient) { }


    ListerTousProjets() {
        return this.http.get(api_list_projet);
    }

    SupprimerProjet(id): Observable<any> {
        return this.http.delete(`${api_supprimer_projet}/${id}`);
    }

    AjouteProjet(projet): Observable<any> {
        return this.http.post(api_ajout_projet, projet);

    }

    ModifierProjet(id, projet): Observable<any> {
        return this.http.put(`${api_modifier_projet}/${id}`, projet);
    }



}
