import {Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 private readonly authService:AuthService = inject(AuthService);
 router:Router = inject(Router)
  form:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required])
  })


  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

   onSubmit(){
   if(this.form.invalid){
     return;
   }
   const credentials =  {
     email:this.email.value,
     password: this.password.value,
   }

   this.authService.login(credentials).subscribe({
     next:() => {
       this.authService.login(this.form.value).subscribe(() => {
         if(this.authService.isAuthenticated()){
           this.router.navigate(['/dashboard']);
         }
       })
     },
     error:(error) => {
       console.log(error.message);
     }
   })
   }
}
