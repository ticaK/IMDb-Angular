import { Component } from "@angular/core";
import { MoviesService } from "src/app/shared/services/movies.service";
import { RoutingService } from "src/app/shared/services/routing.service";
import { HttpService } from "src/app/shared/services/http.service";

@Component({
  selector: "movie-list-page",
  templateUrl: "./movie-list-page.component.html",
  styleUrls: ["./movie-list-page.component.scss"]
})
export class MovieListPageComponent {
  private movies = [];
  private sliceNum = 100;
  public perPage;
  public currentPage;
  public total;

  public constructor(
    private moviesService: MoviesService,
    private routingService: RoutingService,
    private httpService: HttpService
  ) {}

  public ngOnInit() {
    this.getAllMovies(this.currentPage, "");
    this.moviesService.searchTerm$.subscribe(value => {
      this.currentPage = 1;
      this.getAllMovies(this.currentPage, value);
    });
  }

  public getAllMovies(page, searchTerm) {
    this.moviesService
      .getAllMovies(page, searchTerm)
      .then((res: any) => {
        this.movies = res.data.movies.data;
        this.movies.forEach(movie => (movie.clicked = false));
        this.perPage = res.data.movies.per_page;
        this.currentPage = res.data.movies.current_page;
        this.total = res.data.movies.total;
      })
      .catch(err => {
        console.log(err);
      });
  }

  public pageChanged(event) {
    this.currentPage = event;
    this.getAllMovies(event, "");
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

  onKey(event: any) {
    this.moviesService.searchFun(event.target.value);
  }
}
