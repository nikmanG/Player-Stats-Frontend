import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DuelComponent }  from './duel/duel.component'
import { QuidditchComponent } from './quidditch/quidditch.component';

const routes: Routes = [
  { path: 'duelers', component: DuelComponent },
  { path: 'quidditch', component: QuidditchComponent },
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
