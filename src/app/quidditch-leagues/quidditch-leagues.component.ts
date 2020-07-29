import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TeamService } from '../team.service';
import { League } from '../models/league';

@Component({
  selector: 'app-quidditch-leagues',
  templateUrl: './quidditch-leagues.component.html',
  styleUrls: ['./quidditch-leagues.component.css']
})
export class QuidditchLeaguesComponent implements OnInit {

  leagues: League[];
  data: any;
  cd: ChangeDetectorRef;

  constructor(teamService: TeamService, cd: ChangeDetectorRef) {
    this.data = teamService.getLeaguesForType("QUIDDITCH");
    this.cd = cd;
   }

  ngOnInit(): void {
    this.data.subscribe(l => {
      this.leagues = l;
      this.cd.detectChanges();
    })
  }

}
