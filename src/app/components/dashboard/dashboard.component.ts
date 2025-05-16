import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {authInterceptor} from '../../interceptors/auth/auth.interceptor';
import {StoreService} from '../../services/store/store.service';
import {StoreInterface} from '../../interfaces/store.interface';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  storeService:StoreService = inject(StoreService);
  stores:WritableSignal<StoreInterface[] | null>= signal([]);
  ngOnInit(): void {
    this.storeService.getStores().subscribe(s => {
      this.stores.set(s);
    })
  }





}
