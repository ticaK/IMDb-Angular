import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";
import { GuestGuard } from "./shared/guards/guest.guard";

export let appRoutes: Routes = [
  {
    path: "movies",
    loadChildren: "./movie-page/movie-page.module#MoviePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: "./login-page/login-page.module#LoginPageModule",
    canActivate: [GuestGuard]
  },
  {
    path: "register",
    loadChildren:
      "./registration-page/registration-page.module#RegistrationPageModule",
    canActivate: [GuestGuard]
  },
  {
    path: "**",
    redirectTo: "movies",
    pathMatch: "full"
  }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
