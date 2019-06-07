import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const ENDPOINTS = {
  MOVIES: "api/movies",
  ADD_USER: "api/add",
  GENRES: "api/genres",
  POPULAR: "api/popular",
  WATCHLISTS: "api/watchlists"
};

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  private _searchTerm = new Subject();
  public searchTerm$ = this._searchTerm.asObservable().pipe(debounceTime(750));

  constructor(private httpService: HttpService) {}

  public getAllMovies(page = "", searchTerm = "", genre = "") {
    return this.httpService.get(
      `${ENDPOINTS.MOVIES}?page=${page}&&title=${searchTerm}&&genre=${genre}`
    );
  }

  public getSingleMovie(id) {
    return this.httpService.get(`${ENDPOINTS.MOVIES}/${id}`);
  }

  public searchFun(term) {
    this._searchTerm.next(term);
  }

  public editMovie(movie) {
    return this.httpService.put(`${ENDPOINTS.MOVIES}/${movie.id}`, movie);
  }

  public addUser(data) {
    return this.httpService.post(`${ENDPOINTS.ADD_USER}`, data);
  }

  public isUserAlreadyReacted(movie) {
    let userId = JSON.parse(localStorage.getItem("user")).user_id;
    let filteredMovie = movie.users.filter(element => {
      return element.pivot.user_id == userId;
    });

    return filteredMovie && filteredMovie.length;
  }

  public react(movie, reaction) {
    let userId = JSON.parse(localStorage.getItem("user")).user_id;
    reaction == "likes" ? movie.likes++ : movie.dislikes++;
    return this.addUser({ user_id: userId, movie_id: movie.id }).then(res => {
      return this.editMovie(movie);
    });
  }

  public getAllGenres() {
    return this.httpService.get(`${ENDPOINTS.GENRES}`);
  }

  public addComment(id, comment) {
    return this.httpService.post(
      `${ENDPOINTS.MOVIES}/${id}/addComment`,
      comment
    );
  }

  public getPopular() {
    return this.httpService.get(`${ENDPOINTS.POPULAR}`);
  }

  public getRelated(id) {
    return this.httpService.get(`${ENDPOINTS.MOVIES}/${id}/related`);
  }

  public getWatchList() {
    return this.httpService.get(`${ENDPOINTS.WATCHLISTS}`);
  }

  public addToWatchList(movie) {
    return this.httpService.post(`${ENDPOINTS.WATCHLISTS}`, {
      movie_id: movie.id
    });
  }

  public markAsWatched(id) {
    return this.httpService.put(`${ENDPOINTS.WATCHLISTS}/${id}`, {
      watched: true
    });
  }

  public removeFromWatchList(id) {
    return this.httpService.delete(`${ENDPOINTS.WATCHLISTS}/${id}`);
  }

  public isOnWatchList(movie) {
    let userId = JSON.parse(localStorage.getItem("user")).user_id;

    return (
      movie.watch_users &&
      movie.watch_users.find(element => element.pivot.user_id == userId)
    );
  }

  public isWatched(movie) {
    return (
      this.isOnWatchList(movie) &&
      movie.watch_users.find(element => element.pivot.watched == 1)
    );
  }
}
