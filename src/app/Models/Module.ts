import { Projet } from "./Projet";

export interface Module {
    id : string;
    titre : string;
    dateDebut: Date;
    dateFin: Date;
    description: string;
    projet: Projet;
   

}