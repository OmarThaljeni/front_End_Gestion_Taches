import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Projet } from 'src/app/Models/Projet';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';
import { GestionProjetService } from 'src/app/Services/projet.service';
import { map, startWith } from 'rxjs/operators';
import { NotificationService } from 'src/app/Services/notification.service';
import { GestionEquipeService } from 'src/app/Services/equipe.service';

@Component({
  selector: 'app-ajouter-equipe',
  templateUrl: './ajouter-equipe.component.html',
  styleUrls: ['./ajouter-equipe.component.scss']
})
export class AjouterEquipeComponent implements OnInit {

  submitted = false;
  autoCompleteResult: Observable<Projet[]>;
  autoCompleteControl = new FormControl();

  tab_project: any;
  selectedProjet: any;
  membreEquipeControl = new FormControl();
  tab_User: any;



  constructor(private projetService: GestionProjetService, private userService: GestionUsersService, private gestionEquipeService: GestionEquipeService, private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjouterEquipeComponent>) {
    this.autoCompleteResult = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.onAutoComplete(value))
      );
  }

  onAutoComplete(value: string) {
    let result = [];
    if (this.tab_project) {
      result = this.tab_project.filter((project: Projet) => {
        const { titre, description } = project;
        const valueToLowerCase = value && value.toLowerCase ? value.toLowerCase() : '';
        return titre.toLowerCase().includes(valueToLowerCase) || description.toLowerCase().includes(valueToLowerCase);
      })
    }
    return result;
  }

  displayFn() {
    return (project: Projet): string => {
      this.selectedProjet = project;
      return project ? project.titre : '';


    }
  }


  ListerMembreEquipe() {
    let resp = this.userService.ListerMembreEquipe();
    resp.subscribe(res => {
      this.tab_User = res;
    })
  }

  listerListeProject() {
    let resp = this.projetService.ListerTousProjets();
    resp.subscribe(
      response => {
        this.tab_project = response;
        this.selectedProjet = response[0];
      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }


  ngOnInit() {
    this.onCloseOnlickEchap();
    this.listerListeProject();
    this.ListerMembreEquipe();

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
    nomEquipe: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });



  initializeFormGroup() {
    this.form.setValue({
      nomEquipe: '',
    });
  }

  AjouterEquipe() {
    const equipe = {
      nomEquipe: this.form.get('nomEquipe').value,
      projet: this.selectedProjet,
      equipeList: this.membreEquipeControl.value
    };

    this.gestionEquipeService.AjouteEquipe(equipe).subscribe(res => {
      this.submitted = true
      this.DisplayAndClose();
    })
  }

}




