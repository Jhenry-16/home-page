import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { environment } from "../../../environments/environment.development";

export const loggedGuard: CanActivateChildFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem(environment.token_name);

  if (token) {
    router.navigate(["/admin"]);
    return false;
  }

  return true;
};
