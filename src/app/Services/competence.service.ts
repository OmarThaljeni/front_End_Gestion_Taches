import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_list_competence = 'http://localhost:8081/GestionProjet/listerCompetences'

const api_ajout_competence = 'http://localhost:8081/GestionProjet/AjouterCompetence'

const api_modifier_competence = 'http://localhost:8081/GestionProjet/ModifierCompetence'

const api_supprimer_competence = 'http://localhost:8081/GestionProjet/SupprimerCompetence'

const api_ajouter_competence_User = 'http://localhost:8081/GestionProjet/AjouterCompetenceUser'




@Injectable({
    providedIn: 'root'
})
export class CompetenceService {

    constructor(private http: HttpClient) { }


    ListerTousCompetence() {
        return this.http.get(api_list_competence);
    }

    SupprimerCompetence(id): Observable<any> {
        return this.http.delete(`${api_supprimer_competence}/${id}`);
    }

    AjouteCompetence(competence): Observable<any> {
        return this.http.post(api_ajout_competence, competence);

    }

    ModifierCompetence(id, competence): Observable<any> {
        return this.http.put(`${api_modifier_competence}/${id}`, competence);
    }


    
    AjouterCompetenceUser(id, user): Observable<any> {
        return this.http.put(`${api_ajouter_competence_User}/${id}`, user);
    }




}
