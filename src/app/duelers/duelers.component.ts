import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class DuelersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Duelist>;
  dataSource: DuelersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'uuid', 'wins', 'losses', 'elo'];
  data: any;

  constructor(private duelService: DuelService) { }

  ngOnInit() {
    this.data = this.duelService.getDuelists()

    this.data.subscribe(duellists => {
      this.dataSource = new DuelersDataSource();
      this.dataSource.data = duellists;

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });    
  }

  ngAfterViewInit() {
    
  }
}
