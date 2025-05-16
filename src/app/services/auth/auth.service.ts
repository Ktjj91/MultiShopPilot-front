import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = "/api/login";
  httpClient:HttpClient = inject(HttpClient);
  loggedIn:WritableSignal<boolean| null> = signal(null);
  readonly isAuthenticated = computed(() => this.loggedIn() === true);

  login(credentials:{email:string,password:string}) {
    return this.httpClient.post(this.API_URL,credentials,{withCredentials:true})
  }

  checkAuth(){
    return this.httpClient.get<{email:string;roles:string[]}>("/api/me").pipe(
      tap(() => {

        this.loggedIn.set(true)
        console.log('checkAuth OK → loggedIn =', this.loggedIn());

      }),
      catchError((err) => {
        this.loggedIn.set(false)
        console.warn('checkAuth FAILED → loggedIn = false');
        return of(null);
      })
    )
  }

  logout(){
    return this.httpClient.post("/api/logout",{},{withCredentials:true}).pipe(
      tap(() => this.loggedIn.set(false))
    )
  }
}
