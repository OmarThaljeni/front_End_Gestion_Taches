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
import { GestionModulesService } from 'src/app/Services/module.service';

@Component({
  selector: 'app-ajouter-module',
  templateUrl: './ajouter-module.component.html',
  styleUrls: ['./ajouter-module.component.scss']
})
export class AjouterModuleComponent implements OnInit {

  submitted = false;
  autoCompleteResult: Observable<Projet[]>;
  autoCompleteControl = new FormControl();

  tab_projet: any;
  selectedProjet: any;


  constructor(private moduleService: GestionModulesService, private gestionProjetService: GestionProjetService, private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjouterModuleComponent>) {
    this.autoCompleteResult = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.onAutoComplete(value))
      );
  }

  onAutoComplete(value: string) {
    let result = [];
    if (this.tab_projet) {
      result = this.tab_projet.filter((projet: Projet) => {
        const { titre } = projet;
        const valueToLowerCase = value && value.toLowerCase ? value.toLowerCase() : '';
        return titre.toLowerCase().includes(valueToLowerCase);
      })
    }
    return result;
  }

  displayFn() {
    return (projet: Projet): string => {
      this.selectedProjet = projet;
      return projet ? projet.titre : '';

    }
  }

  listerListeProjets() {
    const id = localStorage.getItem('id');
    let resp = this.gestionProjetService.ListeProjetEnAttenteModule(id);
    resp.subscribe(
      response => {
        this.tab_projet = response;
        this.selectedProjet = response[0];
      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));
      });
  }


  ngOnInit() {
    this.onCloseOnlickEchap();
    this.listerListeProjets();

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
  });



  initializeFormGroup() {
    this.form.setValue({
      description: '',
      titre: '',
      dateFin: '',
      dateDebut: ''
    });
  }

  AjouterModule() {
    const id = this.selectedProjet.id;
    if (this.selectedProjet.etatEquipe === 'En attente') {
      this.notificationService.warn('Veuillez ajouter une equipe pour ce projet avant')
    }
    else {
      const module = {
        description: this.form.get('description').value,
        titre: this.form.get('titre').value,
        dateFin: this.form.get('dateFin').value,
        dateDebut: this.form.get('dateDebut').value,
        projet: this.selectedProjet
      }
      let resp = this.moduleService.AjouterModule(id, module);
      resp.subscribe(res => {
        this.submitted = true
        this.DisplayAndClose();
      })

    }
  }
}

