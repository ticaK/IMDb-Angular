import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { moviePageRouting } from "./movie-page.routing";
import { SharedModule } from "../shared/modules/shared.module";
import { MoviePageComponent } from "./movie-page.component";
import { MovieListPageComponent } from "./movie-list/movie-list-page.component";
import { SingleMovieComponent } from "./single-movie/single-movie.component";
import { SingleMovieResolver } from "./single-movie-resolver";
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [RouterModule.forChild(moviePageRouting), SharedModule, NgxPaginationModule],
  declarations: [
    MoviePageComponent,
    MovieListPageComponent,
    SingleMovieComponent
  ],
  exports: [RouterModule],
  providers: [SingleMovieResolver]
})
export class MoviePageModule {}
