import { AfterViewInit, Component, AfterContentInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { QuidditchDataSource } from './quidditch-datasource';
import { QuidditchService } from '../quidditch.service';
import { QuidditchTeam } from '../models/quidditch-team';

@Component({
  selector: 'app-quidditch',
  templateUrl: './quidditch.component.html',
  styleUrls: ['./quidditch.component.css']
})
export class QuidditchComponent implements AfterViewInit, AfterContentInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<QuidditchTeam>;
  dataSource: QuidditchDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['logo', 'name', 'wins', 'losses', 'pointsFor', 'pointsAgainst', 'netPoints'];
  data: any;
  cd: ChangeDetectorRef;

  constructor(quidditchService: QuidditchService, cd: ChangeDetectorRef) {
    this.data = quidditchService.getTeams();
    this.cd = cd;
  }

  ngAfterViewInit() {
    this.data.subscribe(teams => {
      this.dataSource.data = teams;
      console.log(teams);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      
      this.cd.detectChanges();
    }); 
  }

  ngAfterContentInit() {
    this.dataSource = new QuidditchDataSource();
    this.dataSource.data = []
  }


}
