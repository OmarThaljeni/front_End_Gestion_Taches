import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceuilComponent } from './Components/acceuil/acceuil.component';
import { ListeCompetenceUserComponent } from './Components/Gestion_des_competences/liste-competence-user/liste-competence-user.component';
import { ListeCompetenceComponent } from './Components/Gestion_des_competences/liste-competence/liste-competence.component';
import { ListeEquipeComponent } from './Components/Gestion_des_Equipes/liste-equipe/liste-equipe.component';
import { ListeModuleComponent } from './Components/Gestion_des_modules/liste-module/liste-module.component';
import { ListeProjetsComponent } from './Components/Gestion_des_projets/liste-projets/liste-projets.component';
import { ProjetsChefComponent } from './Components/Gestion_des_projets/projets-chef/projets-chef.component';
import { CalendrierTachesComponent } from './Components/Gestion_des_Taches/calendrier-taches/calendrier-taches.component';
import { MesTachesComponent } from './Components/Gestion_des_Taches/mes-taches/mes-taches.component';
import { TableUsersComponent } from './Components/Gestion_des_utilisateurs/table-users/table-users.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthentificationGuard } from './Services/authentification.guard';
import { LogInGuard } from './Services/log-in.guard';

const routes: Routes = [

  { path: '', redirectTo: '/GestionProjet/login',pathMatch:'full',canActivate:[LogInGuard] },

  {path:'GestionProjet' ,
    children:[
      { path: 'login', component:LoginComponent,canActivate:[LogInGuard]},
      { path: 'acceuil', component:AcceuilComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-users', component:TableUsersComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-competence', component:ListeCompetenceComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-competence-user', component:ListeCompetenceUserComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-equipe', component:ListeEquipeComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-projets', component:ListeProjetsComponent,canActivate:[AuthentificationGuard]},
      { path: 'mes-projets', component:ProjetsChefComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-modules', component:ListeModuleComponent,canActivate:[AuthentificationGuard]},
      { path: 'mes-taches', component:MesTachesComponent,canActivate:[AuthentificationGuard]},
      { path: 'calendrier-taches', component:CalendrierTachesComponent,canActivate:[AuthentificationGuard]},
    
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
