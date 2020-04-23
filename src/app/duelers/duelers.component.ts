import { AfterContentInit, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DuelersDataSource } from './duelers-datasource';

import { DuelService } from '../duel.service'
import { Duelist } from '../models/duelist';

@Component({
  selector: 'app-duelers',
  templateUrl: './duelers.component.html',
  styleUrls: ['./duelers.component.css']
})
export class DuelersComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Duelist>;
  dataSource: DuelersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'uuid', 'wins', 'losses', 'elo'];
  data: any;
  cd: ChangeDetectorRef;

  constructor(duelService: DuelService, cd: ChangeDetectorRef) { 
    this.data = duelService.getDuelists();
    this.cd = cd;
  }

  ngAfterContentInit() {
    this.dataSource = new DuelersDataSource();
    this.dataSource.data = [];
  }

  ngAfterViewInit() {
    this.data.subscribe(duellists => {
      this.dataSource.data = duellists;

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      
      this.cd.detectChanges();
    }); 
  }
}
