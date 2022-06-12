import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Projet } from 'src/app/Models/Projet';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { GestionProjetService } from 'src/app/Services/projet.service';
import { AjouterProjetsComponent } from '../ajouter-projets/ajouter-projets.component';
import { ModifierProjetsComponent } from '../modifier-projets/modifier-projets.component';

@Component({
  selector: 'app-liste-projets',
  templateUrl: './liste-projets.component.html',
  styleUrls: ['./liste-projets.component.scss']
})
export class ListeProjetsComponent implements OnInit {

  ELEMENT_DATA: Projet[];
  displayedColumns: string[] = ['titre', 'dateDebut', 'dateFin', 'description', 'user', 'actions'];
  dataSource = new MatTableDataSource<Projet>();


  constructor(private gestionProjetService: GestionProjetService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.listerListeProjets();
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
    dialogConfig.height = "65%";
    this.dialog.open(AjouterProjetsComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerListeProjets();
        }
      )

  }


  ModifierProjet(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "60%";
    dialogConfig.data = row;
    this.dialog.open(ModifierProjetsComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerListeProjets();
        }
      )

  }


  listerListeProjets() {
    let resp = this.gestionProjetService.ListerTousProjets();
    resp.subscribe(
      response => {
        console.log("===>",response);
        
        this.dataSource.data = response as Projet[];
        this.changeDetectorRefs.detectChanges();   

      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }

  SupprimerProjet(row) {
    this.dialogService.openConfirmDialog('Vous étes sur de supprimer ce projet ?')
      .afterClosed().subscribe(res => {

        if (res) {

          this.gestionProjetService.SupprimerProjet(row.id).subscribe(data => {
            this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
            this.notificationService.warn('! Supression effectué aves succeés');
          })

        }
      });




  }
}
