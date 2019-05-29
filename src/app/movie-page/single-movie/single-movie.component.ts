import { Component, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";

@Component({
  selector: "single-movie",
  templateUrl: "./single-movie.component.html"
})
export class SingleMovieComponent implements OnInit {
  public movie = {};

  constructor(public activeRoute: ActivatedRoute) {}

  public ngOnInit() {
    this.activeRoute.data.subscribe(changeData => {
      this.movie = changeData.movies.data;
    });
  }
}
