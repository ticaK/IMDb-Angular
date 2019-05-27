import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RoutingService {
  public constructor(private _router: Router) {}

  public getPageUlr(page,id=null) {
    switch (page) {
      case "":
        return "";
      case "register":
        return "register";
      case "login":
        return "login";
      case "movies":
        return "movies";
      case "singleMovie":
        return `${id}`;

    }
  }

  public goToLoginPage() {
    this._router.navigateByUrl("login");
  }

  public goHomePage() {
    this._router.navigateByUrl("movies");
  }
}
