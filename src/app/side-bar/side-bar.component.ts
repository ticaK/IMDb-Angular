import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../shared/services/movies.service";
import { RoutingService } from "../shared/services/routing.service";

@Component({
  selector: "side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"]
})
export class SideBarComponent implements OnInit {
  public popular = [];
  public constructor(
    public movieService: MoviesService,
    public routingService: RoutingService
  ) {}

  public ngOnInit() {
    this.getPopular();
  }

  public getPopular() {
    this.movieService
      .getPopular()
      .then(res => {
        this.popular = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
