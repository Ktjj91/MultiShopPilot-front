import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private readonly authService:AuthService = inject(AuthService);
  private readonly router:Router = inject(Router);

  ngOnInit(): void {

  }


  logout(): void {
    this.authService.logout().subscribe();
  }




}
