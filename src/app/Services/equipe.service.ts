import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_list_equipe = 'http://localhost:8081/GestionProjet/listerEquipe'

const api_ajout_equipe = 'http://localhost:8081/GestionProjet/AjouterEquipe'

const api_modifier_equipe = 'http://localhost:8081/GestionProjet/ModifierEquipe'

const api_supprimer_equipe = 'http://localhost:8081/GestionProjet/SupprimerEquipe'





@Injectable({
    providedIn: 'root'
})
export class GestionEquipeService {

    constructor(private http: HttpClient) { }


    ListerTousEquipe() {
        return this.http.get(api_list_equipe);
    }

    SupprimerEquipe(id): Observable<any> {
        return this.http.delete(`${api_supprimer_equipe}/${id}`);
    }

    AjouteEquipe(equipe): Observable<any> {
        return this.http.post(api_ajout_equipe, equipe);

    }

    ModifierEquipe(id, equipe): Observable<any> {
        return this.http.put(`${api_modifier_equipe}/${id}`, equipe);
    }



}
