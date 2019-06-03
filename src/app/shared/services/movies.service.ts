import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const ENDPOINTS = {
  MOVIES: "api/movies",
  ADD_USER: "api/add"
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
}
