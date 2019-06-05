import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { moviePageRouting } from "./movie-page.routing";
import { SharedModule } from "../shared/modules/shared.module";
import { MoviePageComponent } from "./movie-page.component";
import { MovieListPageComponent } from "./movie-list/movie-list-page.component";
import { SingleMovieComponent } from "./single-movie/single-movie.component";
import { SingleMovieResolver } from "./single-movie-resolver";
import { NgxPaginationModule } from "ngx-pagination";
import { SideBarComponent } from "../side-bar/side-bar.component";

@NgModule({
  imports: [
    RouterModule.forChild(moviePageRouting),
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [
    MoviePageComponent,
    MovieListPageComponent,
    SingleMovieComponent,
    SideBarComponent
  ],
  exports: [RouterModule],
  providers: [SingleMovieResolver]
})
export class MoviePageModule {}
