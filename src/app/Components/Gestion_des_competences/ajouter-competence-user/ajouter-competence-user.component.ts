import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, pipe } from 'rxjs';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { CompetenceService } from 'src/app/Services/competence.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { map, startWith } from 'rxjs/operators';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';

@Component({
  selector: 'app-ajouter-competence-user',
  templateUrl: './ajouter-competence-user.component.html',
  styleUrls: ['./ajouter-competence-user.component.scss']
})
export class AjouterCompetenceUserComponent implements OnInit {

  submitted = false;

  autoCompleteResult: Observable<Utilisateur[]>;
  autoCompleteControl = new FormControl();
  competenceForm = new FormControl();

  tab_User: any;
  selectedUser: any;

  competenceList:any;



  constructor(private userService:GestionUsersService,private competenceService: CompetenceService, private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjouterCompetenceUserComponent>) { 
      this.autoCompleteResult = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.onAutoComplete(value))
      );
    }





  ngOnInit() {
    this.onCloseOnlickEchap();
    this.listerListeUsers();
    this.remplirListeCompetence();

  }

  remplirListeCompetence()
  {
  let resp = this.competenceService.ListerTousCompetence();
  resp.subscribe(res=> {
    this.competenceList = res;
  })
  }

  DisplayAndClose() {
    if (this.submitted == true) {
      this.dialogRef.close()
      this.notificationService.success(':: Submitted successfully');
    }
  }
  
  displayFn() {
    return (user: Utilisateur): string => {
      this.selectedUser = user;
      return user ?   user.nom + ' ' + user.prenom : '';

    }
  }


  onCloseOnlickEchap() {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.onClose();
      }
    });
    this.dialogRef.backdropClick().subscribe(event => {
      this.onClose();
    });
  }


  onClose() {
    this.dialogRef.close();
  }




 ajouterCompetence()
 {
  const user= {
    competenceList : this.competenceForm.value
  }
  
  let resp = this.competenceService.AjouterCompetenceUser(this.autoCompleteControl.value.id,user);
  resp.subscribe(res=>{
    this.submitted = true
    this.DisplayAndClose();
  })  
 }

  


  onAutoComplete(value: string) {
    let result = [];
    if (this.tab_User) {
      result = this.tab_User.filter((user: Utilisateur) => {
        const { nom, prenom } = user;
        const valueToLowerCase = value && value.toLowerCase ? value.toLowerCase() : '';
        return nom.toLowerCase().includes(valueToLowerCase) || prenom.toLowerCase().includes(valueToLowerCase);
      })
    }
    return result;
  }

  listerListeUsers() {
    let resp = this.userService.ListerTousUsers();
    resp.subscribe(
      response => {
        this.tab_User = response;
        this.selectedUser = response[0];
      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }


}
