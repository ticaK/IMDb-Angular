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
  public genres = [];
  public selectedGenre;

  public constructor(
    private moviesService: MoviesService,
    private routingService: RoutingService,
    private httpService: HttpService
  ) {}

  public ngOnInit() {
    this.getAllMovies(this.currentPage, "", "");
    this.moviesService.searchTerm$.subscribe(value => {
      this.currentPage = 1;
      this.getAllMovies(this.currentPage, value, "");
    });
    this.getAllGenres();
  }

  public getAllMovies(page, searchTerm, genre) {
    this.moviesService
      .getAllMovies(page, searchTerm, genre)
      .then((res: any) => {
        this.movies = res.data.data;
        this.movies.forEach(movie => (movie.clicked = false));
        this.perPage = res.data.per_page;
        this.currentPage = res.data.current_page;
        this.total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  }

  public pageChanged(event) {
    this.currentPage = event;
    this.getAllMovies(event, "", this.selectedGenre);
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

  public onKey(event: any) {
    this.moviesService.searchFun(event.target.value);
  }

  public react(movie, reaction) {
    if (this.moviesService.isUserAlreadyReacted(movie)) {
      alert("You can only like or dislike this movie once");

      return;
    }
    this.moviesService.react(movie, reaction).then(res => {
      for (let i = 0; i < this.movies.length; i++) {
        if (this.movies[i].id == movie.id) {
          this.movies[i] = res.data;
        }
      }
    });
  }

  public getAllGenres() {
    this.moviesService.getAllGenres().then(res => {
      res.data.forEach(genre => {
        this.genres.push(genre.name);
      });
  });
}

  showGenreMovies() {
    this.getAllMovies(1, "", this.selectedGenre);
  }
}
