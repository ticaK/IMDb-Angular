import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { RoutingService } from "./routing.service";
import { Subject } from "rxjs";

const ENDPOINTS = {
  LOGIN: "api/auth/login",
  REGISTER: "api/auth/register",
  LOGOUT: "api/auth/logout"
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public isUserLogIn = false;
  private _userFailedRegister = new Subject();
  public userFailedRegister$ = this._userFailedRegister.asObservable();
  private _userFailedLogin = new Subject();
  public userFailedLogin$ = this._userFailedLogin.asObservable();

  public constructor(
    private _httpService: HttpService,
    public routingService: RoutingService
  ) {
    this.init();
  }

  public goToLoginPage() {
    this.routingService.goToLoginPage();
  }

  public init() {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      this.setAuthorizationHeader();
      this.isUserLogIn = true;
    }
  }

  public setAuthorizationHeader() {
    const token = this.getToken();
    if (token) {
      this._httpService.attachHeaders(`Bearer ${token}`);
    }
  }

  public createSession(user) {
    localStorage.setItem("user", JSON.stringify(user));
    this.setAuthorizationHeader();
  }

  public checkIfUserIsLogIn() {
    return this.isUserLogIn;
  }

  public destroySession() {
    localStorage.clear();
    this._httpService.removeHeaders(["Authorization"]);
  }

  public login(loginData) {
    this._httpService
      .post(ENDPOINTS.LOGIN, loginData)
      .then(res => {
        this.createSession(res.data);
        this.isUserLogIn = true;
        this.routingService.goHomePage();
      })
      .catch(error => {
        this._userFailedLogin.next(error.response.data);
      });
  }

  public register(registerData) {
    console.log(registerData);

    this._httpService
      .post(ENDPOINTS.REGISTER, registerData)
      .then(res => {
        this.routingService.goToLoginPage();
      })
      .catch(error => {
        this._userFailedRegister.next(error.response.data.errors);
      });
  }

  public logout() {
    this._httpService.post(ENDPOINTS.LOGOUT).then(res => {
      this.isUserLogIn = false;
      this.destroySession();
      this.routingService.goToLoginPage();
    });
  }

  public getToken() {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user).access_token : undefined;
  }

  public isAuthenticated() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.access_token ? true : false;
  }

  public getUser() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
  }

  public updateUserInStorage(property) {
    const user = localStorage.getItem("user");
    let jsonUser = JSON.parse(user);
    jsonUser = { ...jsonUser, ...property };
    localStorage.setItem("user", JSON.stringify(jsonUser));
  }
}
