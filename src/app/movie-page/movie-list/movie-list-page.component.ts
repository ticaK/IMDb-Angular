import { Component } from "@angular/core";
import { MoviesService } from "src/app/shared/services/movies.service";
import { RoutingService } from "src/app/shared/services/routing.service";
import { HttpService } from "src/app/shared/services/http.service";

@Component({
  selector: "movie-list-page",
  templateUrl: "./movie-list-page.component.html"
})
export class MovieListPageComponent {
  private movies = [];
  private sliceNum = 100;
  public per_page;
  public current_page;
  public total;

  public constructor(
    private moviesService: MoviesService,
    private routingService: RoutingService,
    private httpService: HttpService
  ) {}

  public ngOnInit() {
    this.getAllMovies(this.current_page);
  }

  public getAllMovies(page) {
    this.moviesService
      .getAllMovies(page)
      .then((res: any) => {
        this.movies = res.data.data;
        this.movies.forEach(movie => (movie.clicked = false));
        this.per_page = res.data.per_page;
        this.current_page = res.data.current_page;
        this.total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  pageChanged(event) {
    this.current_page = event;
    this.getAllMovies(event);
  }

  public showHide(movie) {
    movie.clicked = !movie.clicked;
  }

  public showMoreButtonBool(movie) {
    return !movie.clicked && movie.description.length > this.sliceNum;
  }

  public showLessButtonBool(movie) {
    return movie.clicked;
  }
}
