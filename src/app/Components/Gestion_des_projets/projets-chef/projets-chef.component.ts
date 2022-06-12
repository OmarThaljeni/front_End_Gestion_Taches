import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Projet } from 'src/app/Models/Projet';
import { AuthentificationService } from 'src/app/Services/authentification.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { GestionProjetService } from 'src/app/Services/projet.service';

@Component({
  selector: 'app-projets-chef',
  templateUrl: './projets-chef.component.html',
  styleUrls: ['./projets-chef.component.scss']
})
export class ProjetsChefComponent implements OnInit {

  ELEMENT_DATA: Projet[];
  displayedColumns: string[] = ['titre', 'dateDebut', 'dateFin', 'description', 'user', 'actions'];
  dataSource = new MatTableDataSource<Projet>();


  constructor(public authService:AuthentificationService,private gestionProjetService: GestionProjetService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

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



  listerListeProjets() {
    let resp = this.gestionProjetService.ListerTousProjets();
    resp.subscribe(
      response => {
        this.dataSource.data = response as Projet[];
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }



  }
