import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DuelComponent }  from './duel/duel.component'
import { QuidditchComponent } from './quidditch/quidditch.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  { path: 'duelers', component: DuelComponent },
  { path: 'quidditch', component: QuidditchComponent },
  { path: 'team/:id', component: TeamComponent },
  { path: 'player/:id', component: PlayerComponent },
  { path: '**', redirectTo: 'duelers', pathMatch: 'full' }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
