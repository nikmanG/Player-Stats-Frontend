import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable } from 'rxjs';

import { map, shareReplay } from 'rxjs/operators';

import { Player } from '../models/player'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  cards: Player[];
  name: string;

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private teamService: TeamService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamService.getTeam(params['id']).subscribe(t => {
        this.name = t.name;
        this.cards = t.players;
      });
    });
  }
}
