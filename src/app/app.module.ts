import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { Moment } from 'moment';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatConfirmDialogComponent } from './Components/mat-confirm-dialog/mat-confirm-dialog.component';
import { LoginComponent } from './Components/login/login.component';
import { AcceuilComponent } from './Components/acceuil/acceuil.component';
import { TableUsersComponent } from './Components/Gestion_des_utilisateurs/table-users/table-users.component';
import { AjoutUserComponent } from './Components/Gestion_des_utilisateurs/ajout-user/ajout-user.component';
import { ModifierUserComponent } from './Components/Gestion_des_utilisateurs/modifier-user/modifier-user.component';
import { ListeCompetenceComponent } from './Components/Gestion_des_competences/liste-competence/liste-competence.component';
import { AjouterCompetenceComponent } from './Components/Gestion_des_competences/ajouter-competence/ajouter-competence.component';
import { ModifierCompetenceComponent } from './Components/Gestion_des_competences/modifier-competence/modifier-competence.component';
import { ListeCompetenceUserComponent } from './Components/Gestion_des_competences/liste-competence-user/liste-competence-user.component';
import { AjouterCompetenceUserComponent } from './Components/Gestion_des_competences/ajouter-competence-user/ajouter-competence-user.component';
import { ListeEquipeComponent } from './Components/Gestion_des_Equipes/liste-equipe/liste-equipe.component';
import { ListeProjetsComponent } from './Components/Gestion_des_projets/liste-projets/liste-projets.component';
import { AjouterProjetsComponent } from './Components/Gestion_des_projets/ajouter-projets/ajouter-projets.component';
import { ModifierProjetsComponent } from './Components/Gestion_des_projets/modifier-projets/modifier-projets.component';
import { AjouterEquipeComponent } from './Components/Gestion_des_Equipes/ajouter-equipe/ajouter-equipe.component';
import { ModifierEquipeComponent } from './Components/Gestion_des_Equipes/modifier-equipe/modifier-equipe.component';
import { ProjetsChefComponent } from './Components/Gestion_des_projets/projets-chef/projets-chef.component';
import { ListeModuleComponent } from './Components/Gestion_des_modules/liste-module/liste-module.component';
import { AjouterModuleComponent } from './Components/Gestion_des_modules/ajouter-module/ajouter-module.component';
import { ListeTacheComponent } from './Components/Gestion_des_Taches/liste-tache/liste-tache.component';
import { AjoutTacheComponent } from './Components/Gestion_des_Taches/ajout-tache/ajout-tache.component';
import { MesTachesComponent } from './Components/Gestion_des_Taches/mes-taches/mes-taches.component';
import { CalendrierTachesComponent } from './Components/Gestion_des_Taches/calendrier-taches/calendrier-taches.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatConfirmDialogComponent,
    AcceuilComponent,
    TableUsersComponent,
    AjoutUserComponent,
    ModifierUserComponent,
    ListeCompetenceComponent,
    AjouterCompetenceComponent,
    ModifierCompetenceComponent,
    ListeCompetenceUserComponent,
    AjouterCompetenceUserComponent,
    ListeEquipeComponent,
    ListeProjetsComponent,
    AjouterProjetsComponent,
    ModifierProjetsComponent,
    AjouterEquipeComponent,
    ModifierEquipeComponent,
    ProjetsChefComponent,
    ListeModuleComponent,
    AjouterModuleComponent,
    ListeTacheComponent,
    AjoutTacheComponent,
    MesTachesComponent,
    CalendrierTachesComponent,


  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    DragDropModule,
    AppRoutingModule,
    MatDialogModule,
    MatMomentDateModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ListeTacheComponent,AjoutTacheComponent,AjouterModuleComponent,AjouterEquipeComponent,ModifierEquipeComponent,AjouterProjetsComponent,ModifierProjetsComponent,AjouterCompetenceUserComponent, MatConfirmDialogComponent, AjoutUserComponent, ModifierUserComponent, AjouterCompetenceComponent, ModifierCompetenceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
