import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Equipe } from 'src/app/Models/Equipe';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionEquipeService } from 'src/app/Services/equipe.service';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AjouterEquipeComponent } from '../ajouter-equipe/ajouter-equipe.component';
import { ModifierEquipeComponent } from '../modifier-equipe/modifier-equipe.component';

@Component({
  selector: 'app-liste-equipe',
  templateUrl: './liste-equipe.component.html',
  styleUrls: ['./liste-equipe.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListeEquipeComponent implements OnInit {

  ELEMENT_DATA: Equipe[];
  displayedColumns: string[] = ['nomEquipe', 'titreprojet', 'descprojet', 'actions'];
  dataSource = new MatTableDataSource<Equipe>();
  tab_User: any;
  innerDisplayedColumns = ['nom', 'prenom', 'email'];
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Utilisateur>>;

  expandedElement: Equipe | null;

  usersData: Equipe[] = [];


  constructor(private gestionUserService: GestionUsersService, private gestionEquipe: GestionEquipeService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.listerListeEquipe();
    this.ListerMembreEquipe();
  }

  loadExpandElement() {
    this.dataSource.data.forEach(equipeA => {
      if (equipeA.equipeList && Array.isArray(equipeA.equipeList) && equipeA.equipeList.length) {
        this.usersData = [...this.usersData, { ...equipeA, equipeList: new MatTableDataSource(equipeA.equipeList) }];
      } else {
        this.usersData = [...this.usersData, equipeA];
      }
    });
    this.dataSource = new MatTableDataSource(this.usersData);
    this.dataSource.sort = this.sort;
  }

  toggleRow(equipeA: Equipe) {
    equipeA.equipeList && (equipeA.equipeList as MatTableDataSource<Utilisateur>).data.length ? (this.expandedElement = this.expandedElement === equipeA ? null : equipeA) : null;
    this.changeDetectorRefs.detectChanges();    
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Utilisateur>).sort = this.innerSort.toArray()[index]);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  ListerMembreEquipe() {
    let resp = this.gestionUserService.ListerMembreEquipe();
    resp.subscribe(res => {
      this.tab_User = res;
    })
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  AjoutEquipe() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "65%";
    this.dialog.open(AjouterEquipeComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          window.location.reload();
        }
      )

  }


  ModifierEquipe(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "60%";
    dialogConfig.data = row;
    this.dialog.open(ModifierEquipeComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          window.location.reload();
        }
      )

  }


  listerListeEquipe() {
    let resp = this.gestionEquipe.ListerTousEquipe();
    resp.subscribe(
      response => {
        this.dataSource.data = response as Equipe[];
        this.changeDetectorRefs.detectChanges();
        this.loadExpandElement();

      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }

  SupprimerEquipe(row) {
    this.dialogService.openConfirmDialog('Vous étes sur de supprimer cette équipe ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.gestionEquipe.SupprimerEquipe(row.id).subscribe(data => {
            this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
            this.notificationService.warn('! Supression effectué aves succeés');
          })

        }
      });




  }
}
