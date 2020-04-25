import { Component, ChangeDetectorRef } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';
import { DuelService } from '../duel.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  /** Based on the screen size, switch from standard to one column per row */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  userCard: any;
  matchCard: any;
  duelistCard: any;
  name: string;
  id: number;

  displayedColumns: string[] = ['Winner', 'Winner Elo', 'Loser Elo', 'Loser'];
  statisticColums: string[] = ['Statistic', 'Value'];

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private route: ActivatedRoute, 
    private playerService: PlayerService,
    private duelService: DuelService,
    private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playerService.getPlayer(params['id']).subscribe(t => {
        this.id = params['id'];
        this.name = t.name;
        this.userCard = {uuid: t.uuid, cols: 1, rows: 2};
      });

      this.duelService.getDuelist(params['id']).subscribe(t => {
        this.duelistCard = {info: this.formatDuelistToSingleArray(t), cols: 1, rows: 1};

      });

      this.duelService.getMatchHistory(params['id'], false).subscribe(t => {
        this.matchCard = {matches: t, cols: 2, rows: 1};
      });
    });

    this.cd.detectChanges();
  }

  formatDuelistToSingleArray(value) {
    return [
      {key: 'Elo', value: value.elo},
      {key: 'Wins', value: value.wins},
      {key: 'Losses', value: value.losses},
      {key: 'Total Matches', value: value.wins + value.losses}
  ]
  }
}
