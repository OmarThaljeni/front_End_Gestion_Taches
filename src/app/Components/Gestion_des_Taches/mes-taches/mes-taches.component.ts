import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Tache } from 'src/app/Models/Tache';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionTacheService } from 'src/app/Services/gestion-tache.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-mes-taches',
  templateUrl: './mes-taches.component.html',
  styleUrls: ['./mes-taches.component.scss']
})
export class MesTachesComponent implements OnInit {

  ELEMENT_DATA: Tache[];
  displayedColumns: string[] = ['titre', 'dateDebut', 'dateFin', 'description','etatTache','priorite','user', 'actions'];
  dataSource = new MatTableDataSource<Tache>();


  constructor(private gestionTacheService: GestionTacheService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.listerListeTachesUser();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }



  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


  terminerTache(row)
  {
    const tache = {
      etatTache : 'Valide'
    }
    let resp = this.gestionTacheService.TerminerTache(row.id,tache);
    resp.subscribe(res => {
      this.listerListeTachesUser();
      this.notificationService.success("Tache validé avec succéés!!")
    }
    
    )
  }



  listerListeTachesUser() {
    const id = localStorage.getItem('id');
    let resp = this.gestionTacheService.ListeTacheUsers(id);
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