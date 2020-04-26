import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';
import { DuelService } from '../duel.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  
  @ViewChild('tabs', {static: false}) tabs;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  userCard: any;
  duelistCard: any;
  teamCard: any;
  duelMatchCard: any;  
  quidditchMatchCard: any;

  duelTeamName: string;
  quidditchTeamName: string;
  name: string;
  id: number;

  displayedColumns: string[] = ['Winner', 'Winner Elo', 'Loser Elo', 'Loser'];
  statisticColums: string[] = ['Statistic', 'Value'];

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private route: ActivatedRoute, 
    private playerService: PlayerService,
    private duelService: DuelService,
    private teamService: TeamService,
    private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playerService.getPlayer(params['id']).subscribe(t => {
        this.id = params['id'];
        this.name = t.name;
        this.userCard = {uuid: t.uuid, cols: 1, rows: 2};
        this.tabs.realignInkBar();
      });

      this.duelService.getDuelist(params['id']).subscribe(t => {
        this.duelistCard = {info: this.formatDuelistToSingleArray(t)};
      });

      this.teamService.getTeamsForPlayer(params['id']).subscribe(t => {
        this.teamCard = {duel: this.formatTeamToSingArray(t.DUEL), quidditch: this.formatTeamToSingArray(t.QUIDDITCH)}
        
        this.duelTeamName = t.DUEL?.name;
        this.quidditchTeamName = t.QUIDDITCH?.name;
      })

      this.duelService.getMatchHistory(params['id'], false).subscribe(t => {
        this.duelMatchCard = {matches: t, cols: 2, rows: 1};
        this.quidditchMatchCard = this.duelMatchCard;
      });
    });

    this.cd.detectChanges();
  }

  formatDuelistToSingleArray(value) {
    return [
      {key: 'Elo', value: value.elo},
      {key: 'Wins', value: value.wins},
      {key: 'Losses', value: value.losses},
      {key: 'Total Matches', value: value.wins + value.losses}]
  }

  formatTeamToSingArray(value) {
    if(!value)
      return null;

    return [
      {key: 'Team Name', value: value.name},
      {key: 'Wins', value: value.wins},
      {key: 'Losses', value: value.losses},
      {key: 'Total Matches', value: value.wins + value.losses}]
  }
}
