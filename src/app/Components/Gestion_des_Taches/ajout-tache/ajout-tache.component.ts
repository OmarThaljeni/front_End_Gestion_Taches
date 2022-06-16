import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { map, startWith } from 'rxjs/operators';
import { GestionTacheService } from 'src/app/Services/gestion-tache.service';

@Component({
  selector: 'app-ajout-tache',
  templateUrl: './ajout-tache.component.html',
  styleUrls: ['./ajout-tache.component.scss']
})
export class AjoutTacheComponent implements OnInit {

  submitted = false;
  autoCompleteResult: Observable<Utilisateur[]>;
  autoCompleteControl = new FormControl();

  tab_User: any;
  selectedUser: any;


  constructor(private userService:GestionUsersService,private gestionTacheService: GestionTacheService, private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjoutTacheComponent>) {
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
      let resp = this.userService.ListerMembreEquipe();
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
    priorite : new FormControl(''),  
  });


  

  initializeFormGroup() {
    this.form.setValue({
      description: '',
      titre: '',
      dateFin:'',
      dateDebut:'',
      priorite:''
    });
  }

  addTask()
  {
    const id = this.data.id;
    const task = {
      description: this.form.get('description').value,
      titre: this.form.get('titre').value,
      dateFin: this.form.get('dateFin').value,
      dateDebut: this.form.get('dateDebut').value,
      priorite:this.form.get('priorite').value,
      user:this.selectedUser
  }
  let resp = this.gestionTacheService.AjouterTache(id,task);
  resp.subscribe(res => {
    this.submitted = true
    this.DisplayAndClose();

  })


  }

}

