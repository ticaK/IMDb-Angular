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
  public comments = [];
  public comment = {text:"", user: { name: "" } };

  constructor(
    private moviesService: MoviesService,
    private activeRoute: ActivatedRoute,
    private routingService: RoutingService
  ) {}

  public ngOnInit() {
    this.activeRoute.data.subscribe(changeData => {
      this.movie = changeData.movies.data;
      this.comments = changeData.movies.data.comments;
    });
    this.viewsIncrement(this.movie);
  }

  public react(movie, reaction) {
    if (this.moviesService.isUserAlreadyReacted(movie)) {
      alert("You can only like or dislike this movie once");

      return;
    }
    this.moviesService.react(movie, reaction).then(res => {
      this.movie = res.data;
    });
  }

  public viewsIncrement(movie) {
    movie.views++;
    this.moviesService.editMovie(movie);
  }

  public addComment(id, comment) {
    this.moviesService.addComment(id, comment).then(res => {
      this.comment.user.name = res.data.user.name;
      this.comments.push(comment);
    });
  }
}
