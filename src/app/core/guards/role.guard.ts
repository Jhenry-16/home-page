import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.development';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();

  const token = localStorage.getItem(environment.token_name);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data?.['roles'];
  const blockedRoles = route.data?.['blockedRoles'];

  const decodedToken = jwtHelper.decodeToken(token);

  if (allowedRoles && !allowedRoles.includes(decodedToken.role)) {
    router.navigate(['/acceso-denegado']);
    return false;
  }

  if (blockedRoles && blockedRoles.includes(decodedToken.role)) {
    router.navigate(['/acceso-denegado']);
    return false;
  }

  return true;
};
