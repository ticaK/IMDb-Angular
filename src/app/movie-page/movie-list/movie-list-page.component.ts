import { Component } from "@angular/core";
import { MoviesService } from "src/app/shared/services/movies.service";

@Component({
  selector: "movie-list-page",
  templateUrl: "./movie-list-page.component.html"
})
export class MovieListPageComponent {
  private movies = [];

  public constructor(private moviesService: MoviesService) {}

  public ngOnInit() {
    this.getAllMovies();
  }

  public getAllMovies() {
    this.moviesService
      .getAllMovies()
      .then((res: any) => {
        this.movies = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
}