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

  public react(movie, reaction) {
    if (movie.reacted) {
      alert("You can only like or dislike this movie once");

      return;
    }
    let userId = JSON.parse(localStorage.getItem("user")).user_id;
    for (let i = 0; i < movie.users.length; i++) {
      if (
        movie.users[i].pivot.movie_id == movie.id &&
        movie.users[i].pivot.user_id == userId
      ) {
        movie.reacted = true;
        alert("You can only like or dislike this movie once");
        
        return;
      }
    }
    if (!movie.reacted) {
      reaction == "likes" ? movie.likes++ : movie.dislikes++;
      this.editMovie(movie);
      this.addUser({ user_id: userId, movie_id: movie.id });
      movie.reacted = true;
    }
  }
}
