import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = "/api/login";
  httpClient:HttpClient = inject(HttpClient);
  loggedIn:WritableSignal<boolean| null> = signal(null)

  login(credentials:{email:string,password:string}) {
    return this.httpClient.post(this.API_URL,credentials,{withCredentials:true})
  }

  checkAuth(){
    return this.httpClient.get<{email:string;roles:string[]}>("/api/me").pipe(
      tap(() =>this.loggedIn.set(true)),
      catchError((err) => {
        this.loggedIn.set(false)
        return of(null);
      })
    )
  }

}
