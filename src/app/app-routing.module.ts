import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';

import { DuelersComponent }  from './duelers/duelers.component'
import { QuidditchComponent } from './quidditch/quidditch.component';

const routes: Routes = [
  { path: 'duelers', component: DuelersComponent },
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
