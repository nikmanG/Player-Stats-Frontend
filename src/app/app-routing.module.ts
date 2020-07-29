import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DuelComponent }  from './duel/duel.component'
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { QuidditchLeaguesComponent } from './quidditch-leagues/quidditch-leagues.component';

const routes: Routes = [
  { path: 'duelers', component: DuelComponent },
  { path: 'quidditch', component: QuidditchLeaguesComponent },
  { path: 'team/:id', component: TeamComponent },
  { path: 'player/:id', component: PlayerComponent },
  { path: '**', redirectTo: 'quidditch', pathMatch: 'full' }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ]
})
export class AppRoutingModule { }
