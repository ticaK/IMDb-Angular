import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { RoutingService } from "../services/routing.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _routingService: RoutingService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this._authService.checkIfUserIsLogIn()) {
        return resolve(true);
      }
      this._routingService.goToLoginPage();
      return reject(false);
    });
  }
}
