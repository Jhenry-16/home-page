import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLogged());
  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    window.addEventListener('storage', (event) => {});
  }

  login(username: string, password: string) {
    const body: any = { username, password };
    return null;
  }

  // saveToken(token: string) {
  //   localStorage.setItem(environment.token_name, token);
  //   this.loggedIn.next(true);
  // }

  logout() {
    localStorage.clear();
    // localStorage.removeItem(environment.token_name);
    this.router.navigate(['/']);
  }

  isLogged() {
    return localStorage.getItem('token') != null;
  }
}
