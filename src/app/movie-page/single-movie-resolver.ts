import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { MoviesService } from "../shared/services/movies.service";

@Injectable()
export class SingleMovieResolver implements Resolve<any> {
  public constructor(public movieService: MoviesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.movieService.getSingleMovie(route.params.id);
  }
}
