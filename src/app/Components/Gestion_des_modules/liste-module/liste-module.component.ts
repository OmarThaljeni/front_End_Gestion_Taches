import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Module } from 'src/app/Models/Module';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionModulesService } from 'src/app/Services/module.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AjouterModuleComponent } from '../ajouter-module/ajouter-module.component';

@Component({
  selector: 'app-liste-module',
  templateUrl: './liste-module.component.html',
  styleUrls: ['./liste-module.component.scss']
})
export class ListeModuleComponent implements OnInit {

  ELEMENT_DATA: Module[];
  displayedColumns: string[] = ['titre', 'dateDebut', 'dateFin', 'description', 'projet','Chefprojet', 'actions'];
  dataSource = new MatTableDataSource<Module>();


  constructor(private gestionModuleService: GestionModulesService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.listerListeModule();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }



  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  AjoutModule() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "65%";
    this.dialog.open(AjouterModuleComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerListeModule();
        }
      )

  }




  listerListeModule() {
    let resp = this.gestionModuleService.ListerTousModules();
    resp.subscribe(
      response => {
        this.dataSource.data = response as Module[];
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }

}
