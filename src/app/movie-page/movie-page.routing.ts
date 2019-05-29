import { Routes } from "@angular/router";
import { MoviePageComponent } from "./movie-page.component";
import { MovieListPageComponent } from "./movie-list/movie-list-page.component";
import { SingleMovieComponent } from "./single-movie/single-movie.component";
import { SingleMovieResolver } from "./single-movie-resolver";

export const moviePageRouting: Routes = [
  {
    path: "",
    component: MoviePageComponent,
    children: [
      {
        path: "",
        component: MovieListPageComponent
      },
      {
        path: ":id",
        component: SingleMovieComponent,
        resolve: { movies: SingleMovieResolver }
      }
    ]
  }
];
