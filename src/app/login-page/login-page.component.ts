import { Component, ChangeDetectorRef } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: "login-page",
  templateUrl: "./login-page.component.html"
})
export class LoginPageComponent {
  public user = {};
  public error = {};

  public constructor(
    private _authService: AuthService,
    private ref: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this._authService.userFailedLogin$.subscribe(value => {
      this.error = value;
      this.ref.detectChanges();
    });
  }

  public login() {
    this._authService.login(this.user);
  }
}
