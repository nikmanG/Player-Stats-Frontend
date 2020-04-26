import { AfterViewInit, Component, AfterContentInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DuelTeamsDataSource } from './duel-teams-datasource';

import { DuelService } from '../duel.service'
import { Team } from '../models/team';

@Component({
  selector: 'app-duel-teams',
  templateUrl: './duel-teams.component.html',
  styleUrls: ['./duel-teams.component.css']
})
export class DuelTeamsComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Team>;
  dataSource: DuelTeamsDataSource;

  displayedColumns = ['logo', 'name', 'wins', 'losses'];
  data: any;
  cd: ChangeDetectorRef

  constructor(duelService: DuelService, cd: ChangeDetectorRef) { 
    this.data = duelService.getTeams();
    this.cd = cd;
  }

  ngAfterContentInit() {
    this.dataSource = new DuelTeamsDataSource();
    this.dataSource.data = []
  }

  ngAfterViewInit() {
    this.data.subscribe(teams => {
      this.dataSource.data = teams;

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      
      this.cd.detectChanges();
    }); 
  }
}
