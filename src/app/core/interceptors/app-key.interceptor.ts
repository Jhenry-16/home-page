import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class AppKeyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.url_api)) {
      const cloned = req.clone({
        setHeaders: {
          "ACADEMIA-APP-KEY": environment.app_key,
        },
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
