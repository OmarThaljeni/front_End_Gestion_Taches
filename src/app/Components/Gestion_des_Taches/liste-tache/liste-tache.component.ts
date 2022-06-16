import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Tache } from 'src/app/Models/Tache';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionTacheService } from 'src/app/Services/gestion-tache.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AjoutTacheComponent } from '../ajout-tache/ajout-tache.component';

@Component({
  selector: 'app-liste-tache',
  templateUrl: './liste-tache.component.html',
  styleUrls: ['./liste-tache.component.scss']
})
export class ListeTacheComponent implements OnInit {

  ELEMENT_DATA: Tache[];
  displayedColumns: string[] = ['titre', 'dateDebut', 'dateFin', 'description','etatTache','priorite','user', 'actions'];
  dataSource = new MatTableDataSource<Tache>();


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private gestionTacheService: GestionTacheService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef,public dialogRef: MatDialogRef<ListeTacheComponent>) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.listerListeTaches();
    this.onCloseOnlickEchap();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }



  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  AjoutProjet() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "75%";
    dialogConfig.data = this.data;
    this.dialog.open(AjoutTacheComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerListeTaches();
        }
      )

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





  listerListeTaches() {
    let resp = this.gestionTacheService.ListeTacheModule(this.data.id);
    resp.subscribe(
      response => {                
        this.dataSource.data = response as Tache[];        
        this.changeDetectorRefs.detectChanges();   
      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }




  

}
