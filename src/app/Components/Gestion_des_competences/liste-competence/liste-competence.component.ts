import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Competence } from 'src/app/Models/Competence';
import { CompetenceService } from 'src/app/Services/competence.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AjouterCompetenceComponent } from '../ajouter-competence/ajouter-competence.component';
import { ModifierCompetenceComponent } from '../modifier-competence/modifier-competence.component';

@Component({
  selector: 'app-liste-competence',
  templateUrl: './liste-competence.component.html',
  styleUrls: ['./liste-competence.component.scss']
})
export class ListeCompetenceComponent implements OnInit {

  //ELEMENT_DATA: Utilisateur[];
  ELEMENT_DATA: Competence[];
  displayedColumns: string[] = ['description', 'titre', 'actions'];
  dataSource = new MatTableDataSource<Competence>();


  constructor(private competenceService: CompetenceService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.listerListeCompetence();
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
          this.listerListeCompetence();
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
        this.dataSource.data = response as Competence[];
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
