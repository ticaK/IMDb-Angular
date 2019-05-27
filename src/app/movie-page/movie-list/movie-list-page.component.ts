import { Component } from "@angular/core";
import { MoviesService } from "src/app/shared/services/movies.service";
import { RoutingService } from "src/app/shared/services/routing.service";

@Component({
  selector: "movie-list-page",
  templateUrl: "./movie-list-page.component.html"
})
export class MovieListPageComponent {
  private movies = [];
  private sliceNum = 1000;

  public constructor(
    private moviesService: MoviesService,
    private routingService: RoutingService
  ) {}

  public ngOnInit() {
    this.getAllMovies();
  }

  public getAllMovies() {
    this.moviesService
      .getAllMovies()
      .then((res: any) => {
        this.movies = res.data;
        this.movies.forEach(movie => (movie.clicked = false));
      })
      .catch(err => {
        console.log(err);
      });
  }

  public showMore(movie) {
    movie.clicked = true;
  }

  public showLess(movie) {
    movie.clicked = false;
  }

  public showMoreButtonBool(movie) {
    return !movie.clicked && movie.description.length > this.sliceNum;
  }

  public showLessButtonBool(movie) {
    return movie.clicked;
  }
}
