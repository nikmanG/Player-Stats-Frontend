import { Component, ChangeDetectorRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { DuelService } from '../duel.service';
import { Duelist } from '../models/duelist';
import { takeUntil, take } from 'rxjs/operators';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { QuidditchTeam } from '../models/quidditch-team';
import { QuidditchService } from '../quidditch.service';
import { Team } from '../models/team';

export class Data {
  name: string;
  id: number;
  image: string;
}

@Component({
  selector: 'app-betting-form',
  templateUrl: './betting-form.component.html',
  styleUrls: ['./betting-form.component.css']
})
export class BettingFormComponent implements OnInit {
  public filteredData: ReplaySubject<Data[]> = new ReplaySubject<Data[]>(1);

  public dataControl = new FormControl();

  protected _onDestroy = new Subject<void>();

  matchTypes = [
    {value: 'QUIDDITCH', name: 'Quidditch'},
    {value: 'DUEL_TEAM', name: 'Duel Team'},
    {value: 'DUEL_SINGLE', name: 'Duel Single'}];
    
  bettingForm: FormGroup;
  
  targetData: Data[];

  duelists: Data[];
  duelistData: Observable<Duelist[]>;
  
  quidditchTeams: Data[];
  quidditchData: Observable<QuidditchTeam[]>;

  duelTeams: Data[];
  duelTeamData: Observable<Team[]>;

  changeDetector: ChangeDetectorRef;

  constructor(private fb: FormBuilder, duelService: DuelService, quidditchService: QuidditchService, private  cd: ChangeDetectorRef) {
     this.bettingForm = this.fb.group({
      name: [null, Validators.required],
      bets: this.fb.array([this.createBettingRow()])
    });
    this.changeDetector = cd;
    this.duelistData = duelService.getDuelists();
    this.duelTeamData = duelService.getTeams();
    this.quidditchData = quidditchService.getTeams();
  }

  ngOnInit() {
    this.duelistData.subscribe(duellists => {
      this.duelists = duellists.map(d => {
        let data = new Data();
        data.name = d.player.name;
        data.id = d.id;
        data.image = "https://crafatar.com/avatars/" + d.player.uuid + "?size=32";

        return data;
      });

      this.targetData = this.duelists;

      this.filteredData.next(this.targetData.slice());
      this.cd.detectChanges();

      this.dataControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData();
      });
    });

    this.quidditchData.subscribe(teams => {
      this.quidditchTeams = teams.map(d => {
        let data = new Data();
        data.name = d.team.name;
        data.id = d.id;
        data.image = d.team.logoUrl;

        return data;
      });

      this.cd.detectChanges();
    });

    this.duelTeamData.subscribe(teams => {
      this.duelTeams = teams.map(d => {
        let data = new Data();
        data.name = d.name;
        data.id = d.id;
        data.image = d.logoUrl;

        return data;
      })
    })
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  //Dynamic row stuff
  //Select filters
  protected filterData() {
    if(!this.duelists) {
      return;
    }

    let search = this.dataControl.value;

    if(!search) {
      this.filteredData.next(this.targetData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredData.next(
      this.duelists.filter(data => data.name.toLowerCase().indexOf(search) > -1)
    );
  }

  get bets(): FormArray {
    return this.bettingForm.get('bets') as FormArray;
  }

  addBettingRow() {
    this.bets.push(this.createBettingRow());
  }

  createBettingRow(): FormGroup {
    return this.fb.group({
      eventType: [null, Validators.pattern('^QUIDDITCH|DUEL_SINGLE|DUEL_TEAM$')],
      chosen: [null, Validators.required],
      opposing: [null, Validators.required],
      galleons: [null, Validators.compose([Validators.required, Validators.min(1)])]
    })
  }

  removeBettingRow(i) {
    this.bets.removeAt(i);
  }
  // Form manipulation
  onEventTypeChange(event) {
    if(event.value === 'DUEL_SINGLE') {
      this.targetData = this.duelists;
    } else if(event.value === 'QUIDDITCH') {
      this.targetData = this.quidditchTeams;
    } else {
      this.targetData = this.duelTeams;
    }

    this.filteredData.next(this.targetData.slice());
    this.changeDetector.detectChanges();
  }

  onSubmit() {
    alert('Thanks!');
  }
}
