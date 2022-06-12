import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CompetenceService } from 'src/app/Services/competence.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-ajouter-competence',
  templateUrl: './ajouter-competence.component.html',
  styleUrls: ['./ajouter-competence.component.scss']
})
export class AjouterCompetenceComponent implements OnInit {

  submitted = false;


  constructor(private competenceService: CompetenceService, private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjouterCompetenceComponent>) { }

  ngOnInit() {
    this.onCloseOnlickEchap()

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
    titre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });



  initializeFormGroup() {
    this.form.setValue({
      description: '',
      titre: '',
    });
  }

  AjouterCompetence() {
    if (this.form.valid) {
      const competence = {
        description: this.form.get('description').value,
        titre: this.form.get('titre').value,
      };

      this.competenceService.AjouteCompetence(competence).subscribe(res => {
        this.submitted = true
        this.DisplayAndClose();
      })
    }

  }
}

