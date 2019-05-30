import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const ENDPOINTS = {
  MOVIES: "api/movies"
};

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  private _searchTerm = new Subject();
  public searchTerm$ = this._searchTerm.asObservable().pipe(debounceTime(750));
  constructor(private httpService: HttpService) {}

  public getAllMovies(page = "", searchTerm = "") {
    return this.httpService.get(
      `${ENDPOINTS.MOVIES}?page=${page}&&title=${searchTerm}`
    );
  }

  public getSingleMovie(id) {
    return this.httpService.get(`${ENDPOINTS.MOVIES}/${id}`);
  }

  public searchFun(term) {
    this._searchTerm.next(term);
  }
}
