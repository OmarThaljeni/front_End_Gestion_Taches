import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AjoutUserComponent } from '../ajout-user/ajout-user.component';
import { ModifierUserComponent } from '../modifier-user/modifier-user.component';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit {


  //ELEMENT_DATA: Utilisateur[];
  ELEMENT_DATA: Utilisateur[];
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'adresse', 'numTel', 'role', 'actions'];
  dataSource = new MatTableDataSource<Utilisateur>();


  constructor(private gestionUserService: GestionUsersService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {

    this.listerListeUsers();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }



  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  AjoutUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "65%";
    this.dialog.open(AjoutUserComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerListeUsers();
        }
      )

  }


  ModifierUser(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "65%";
    dialogConfig.data = row;
    this.dialog.open(ModifierUserComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerListeUsers();
        }
      )

  }


  listerListeUsers() {
    let resp = this.gestionUserService.ListerTousUsers();
    resp.subscribe(
      response => {
        this.dataSource.data = response as Utilisateur[];
        this.changeDetectorRefs.detectChanges();


      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }

  supprimerUser(row) {

    this.dialogService.openConfirmDialog('Vous étes sur de supprimer ce utilisateur ?')
      .afterClosed().subscribe(res => {

        if (res) {

          this.gestionUserService.SupprimerUser(row.id).subscribe(data => {
            this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
            this.notificationService.warn('! Supression effectué aves succeés');
          })

        }
      });




  }


}
