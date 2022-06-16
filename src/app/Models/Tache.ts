import { Module } from "./Module";
import { Utilisateur } from "./Utilisateur";

export interface Tache {
    id : string;
    titre: string;
    dateDebut: Date,
    dateFin: Date,
    description: string,
    etatTache: string,
    priorite: string,
   user:Utilisateur, 
    module : Module []
}