import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../../environments/environment.development";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();
  const token = localStorage.getItem(environment.token_name);

  if (!token) {
    router.navigate(["/login"]);
    return false;
  }

  if (jwtHelper.isTokenExpired(token)) {
    localStorage.clear();

    router.navigate(["/login"]);

    return false;
  }

  return true;
};
