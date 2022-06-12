import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Competence } from 'src/app/Models/Competence';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { CompetenceService } from 'src/app/Services/competence.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AjouterCompetenceComponent } from '../ajouter-competence/ajouter-competence.component';
import { ModifierCompetenceComponent } from '../modifier-competence/modifier-competence.component';
import { map, startWith } from 'rxjs/operators';
import { AjouterCompetenceUserComponent } from '../ajouter-competence-user/ajouter-competence-user.component';

@Component({
  selector: 'app-liste-competence-user',
  templateUrl: './liste-competence-user.component.html',
  styleUrls: ['./liste-competence-user.component.scss']
})
export class ListeCompetenceUserComponent implements OnInit {

  ELEMENT_DATA: Competence[];
  displayedColumns: string[] = ['description', 'titre'];
  dataSource = new MatTableDataSource<Competence>();
  autoCompleteResult: Observable<Utilisateur[]>;
  autoCompleteControl = new FormControl();

  tab_User: any;
  selectedUser: any;

  constructor(private userService: GestionUsersService, private competenceService: CompetenceService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) {
    this.autoCompleteResult = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.onAutoComplete(value))
      );

  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;

  displayFn() {
    return (user: Utilisateur): string => {
      this.selectedUser = user;
      return user ?   user.nom + ' ' + user.prenom : '';

    }
  }


  remplirListeCompetence()
  {
    this.dataSource.data = this.selectedUser.competenceList;    
  }

  AjoutCompetenceUser() {
    
    this.autoCompleteControl.reset();
    this.dataSource.data = [];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "60%";
    this.dialog.open(AjouterCompetenceUserComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
            this.listerListeUsers();
            
            this.changeDetectorRefs.detectChanges();
          }
      )

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
  //  this.listerListeCompetence();
   this.listerListeUsers();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }



  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  AjoutCompetence() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "60%";
    this.dialog.open(AjouterCompetenceComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          window.location.reload();
        }
      )

  }


  ModifieCompetence(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "60%";
    dialogConfig.data = row;
    this.dialog.open(ModifierCompetenceComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerListeCompetence();
        }
      )

  }


  listerListeCompetence() {
    let resp = this.competenceService.ListerTousCompetence();
    resp.subscribe(
      response => {
    //    this.dataSource.data = response as Competence[];
        this.changeDetectorRefs.detectChanges();


      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }

  SupprimerCompetence(row) {
    this.dialogService.openConfirmDialog('Vous étes sur de supprimer cette compétence ?')
      .afterClosed().subscribe(res => {

        if (res) {

          this.competenceService.SupprimerCompetence(row.id).subscribe(data => {
            this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
            this.notificationService.warn('! Supression effectué aves succeés');
          })

        }
      });



  }
}
