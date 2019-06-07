import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/modules/shared.module';
import { WatchListComponent } from './watch-list.component';
import { watchListRouting } from './watch-list.routing';

@NgModule({
  imports: [
    RouterModule.forChild(watchListRouting),
    SharedModule
  ],
  declarations: [
    WatchListComponent
  ],
  exports: [
    RouterModule
  ]
})

export class WatchListModule { }
