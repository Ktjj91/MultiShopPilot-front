import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StoreInterface} from '../../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private  readonly httpClient:HttpClient = inject(HttpClient);
  private  readonly API_URL = "/api/stores"


  getStores():Observable<StoreInterface[]>{
    return this.httpClient.get<StoreInterface[]>(this.API_URL,{withCredentials:true});
  }

}
