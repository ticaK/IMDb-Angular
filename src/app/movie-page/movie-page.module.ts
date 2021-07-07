import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { moviePageRouting } from './movie-page.routing';
import { SharedModule } from '../shared/modules/shared.module';
import { MoviePageComponent } from './movie-page.component';
import { MovieListPageComponent } from './movie-list/movie-list-page.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';

@NgModule({
  imports: [
    RouterModule.forChild(moviePageRouting),
    SharedModule
  ],
  declarations: [
    MoviePageComponent,
    MovieListPageComponent,
    SingleMovieComponent
  ],
  exports: [
    RouterModule
  ]
})

export class MoviePageModule { }
