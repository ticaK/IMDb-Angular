import { Component, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { RoutingService } from "src/app/shared/services/routing.service";
import { MoviesService } from "src/app/shared/services/movies.service";

@Component({
  selector: "single-movie",
  templateUrl: "./single-movie.component.html",
  styleUrls: ["./single-movie.component.scss"]
})
export class SingleMovieComponent implements OnInit {
  public movie = {};

  constructor(
    private moviesService: MoviesService,
    private activeRoute: ActivatedRoute,
    private routingService: RoutingService
  ) {}

  public ngOnInit() {
    this.activeRoute.data.subscribe(changeData => {
      this.movie = changeData.movies.data;
    });
  }

  public react(movie, reaction) {
    this.moviesService.react(movie, reaction);
  }
}
