import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {authInterceptor} from '../../interceptors/auth/auth.interceptor';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly authService:AuthService = inject(AuthService);

  ngOnInit(): void {
      this.authService.checkAuth().subscribe(auth => {
        console.log(auth);
      })
  }



}
