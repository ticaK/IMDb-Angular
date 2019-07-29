import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../shared/services/movies.service";
import { RoutingService } from "../shared/services/routing.service";

@Component({
  selector: "watch-list",
  templateUrl: "./watch-list-component.html"
})
export class WatchListComponent implements OnInit {
  public watchList = [];

  public constructor(
    public moviesService: MoviesService,
    public routingService: RoutingService
  ) {}

  public ngOnInit() {
    this.getWatchList();
  }

  public getWatchList() {
    this.moviesService
      .getWatchList()
      .then(res => {
        this.watchList = res.data;
      })
      .catch(err => console.log(err));
  }

  public markAsWatched(movie) {
    this.moviesService
      .markAsWatched(movie)
      .then(res => {
        this.getWatchList();
      })
      .catch(err => console.log(err));
  }

  public removeFromWatchList(movie) {
    this.moviesService
      .removeFromWatchList(movie)
      .then(res => {
        this.getWatchList();
      })
      .catch(err => console.log(err));
  }
}
