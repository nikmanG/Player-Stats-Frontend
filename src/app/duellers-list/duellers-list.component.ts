import { Component, OnInit } from '@angular/core';

import { DuelService } from '../duel.service'
import { Duelist } from '../models/duelist';

@Component({
  selector: 'app-duellers-list',
  templateUrl: './duellers-list.component.html',
  styleUrls: ['./duellers-list.component.css']
})
export class DuellersListComponent implements OnInit {

  duellists: Duelist[];

  constructor(private duelService: DuelService) { }

  ngOnInit(): void {
    this.getDuelists();
  }

  getDuelists(): void {
    this.duelService.getDuelists().subscribe(duellists => this.duellists = duellists);
  }
}
