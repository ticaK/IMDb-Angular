import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

const ENDPOINTS = {
  MOVIES: "api/movies"
};

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor(private httpService: HttpService) {}

  public getAllMovies(page = 1) {
    return this.httpService.get(`${ENDPOINTS.MOVIES}?page=${page}`);
  }

  public getSingleMovie(id) {
    return this.httpService.get(`${ENDPOINTS.MOVIES}/${id}`);
  }
}
