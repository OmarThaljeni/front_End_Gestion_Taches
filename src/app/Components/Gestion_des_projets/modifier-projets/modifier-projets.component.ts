import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';
import { GestionProjetService } from 'src/app/Services/projet.service';
import { map, startWith } from 'rxjs/operators';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-modifier-projets',
  templateUrl: './modifier-projets.component.html',
  styleUrls: ['./modifier-projets.component.scss']
})
export class ModifierProjetsComponent implements OnInit {

  submitted = false;
  autoCompleteResult: Observable<Utilisateur[]>;
  autoCompleteControl = new FormControl();

  tab_User: any;
  selectedUser: any;


  constructor(private userService:GestionUsersService,private gestionProjetService: GestionProjetService, private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModifierProjetsComponent>) {
      this.autoCompleteResult = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.onAutoComplete(value))
      );
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

    displayFn() {
      return (user: Utilisateur): string => {
        this.selectedUser = user;
        return user ?   user.nom + ' ' + user.prenom : '';
  
      }
    }

    listerChefsProjets() {
      let resp = this.userService.ListerTousChefProjet();
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
  

  ngOnInit() {
    this.onCloseOnlickEchap();
    this.listerChefsProjets();
    this.initializeFormGroup();    
    console.log("===> ",this.data.user);
    
  }

  DisplayAndClose() {
    if (this.submitted == true) {
      this.dialogRef.close()
      this.notificationService.success(':: Submitted successfully');
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
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    titre: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    dateDebut: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    dateFin: new FormControl('', [Validators.required, Validators.maxLength(20)]),  
    nomUser: new FormControl('', [Validators.required, Validators.maxLength(20)]),  
  });



  initializeFormGroup() {
    this.form.setValue({
      description: this.data.description,
      titre: this.data.titre,
      dateFin:this.data.dateFin,
      dateDebut:this.data.dateDebut,
      nomUser:this.data.user
    });
  }

  ModifierProjet() {

      const projet = {
        description: this.form.get('description').value,
        titre: this.form.get('titre').value,
        dateFin: this.form.get('dateFin').value,
        dateDebut: this.form.get('dateDebut').value,
        user:this.selectedUser
      };      

      this.gestionProjetService.ModifierProjet(this.data.id,projet).subscribe(res => {
        this.submitted = true
        this.DisplayAndClose();
      })
    

  }
}
