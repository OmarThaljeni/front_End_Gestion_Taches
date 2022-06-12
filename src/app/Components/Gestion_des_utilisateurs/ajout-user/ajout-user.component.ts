import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.scss']
})
export class AjoutUserComponent implements OnInit {
  submitted = false;


  constructor(private ajoutService:GestionUsersService,private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjoutUserComponent>) { }

  ngOnInit() {
    this.onCloseOnlickEchap()

  }

  DisplayAndClose() {
    if (this.submitted == true) {
      this.dialogRef.close()
      this.notificationService.success(':: Submitted successfully');
    }
  }


  onCloseOnlickEchap()
  {
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
    nom: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    prenom: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    adresse: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    numTel: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    roles: new FormControl('', [Validators.required]),
  });



  initializeFormGroup() {
    this.form.setValue({
      nom: '',
      prenom: '',
      email: '',
      adresse:'',
      password:'',
      numTel:'',
      roles:''
    });
  }

AjouterUtilisateur()
{  
  
  
  if (this.form.valid) {
    const utilisateur = {
      nom: this.form.get('nom').value,
      prenom: this.form.get('prenom').value,
      email: this.form.get('email').value,
      adress: this.form.get('adresse').value,
      numTel: this.form.get('numTel').value,
      roles: this.form.get('roles').value,
      password: this.form.get('password').value,
    };

     this.ajoutService.AjouterUser(utilisateur).subscribe(res => {
      this.submitted = true
      this.DisplayAndClose();
    } )

  
}

    

  }
}






