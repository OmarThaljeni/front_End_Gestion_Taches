import { Utilisateur } from "./Utilisateur";

export interface Projet {
    id : string;
    titre: string;
    dateDebut: Date,
    dateFin: Date,
    description: string,
    etatProjet: string,
    user:Utilisateur 


}