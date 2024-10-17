import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm!: FormGroup;
  isPasswordVisible: boolean = false;
  invalid:any;
  authenticated:boolean=false;
  constructor(private router: Router,private serv:UsersService) {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6),
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%]).{6,}$/)
      ]),
    })
  }
  ngOnInit(): void {
  
  }


  loginSender() {
    if (this.LoginForm.valid) {
      const Store = this.LoginForm.value;
      const dataToStore = {
        email: Store.email,
        password: Store.password
      };

      this.serv.login(dataToStore).subscribe({
        next: (res:any) => {
          if(res.user.role=='premium'){
            localStorage.setItem('premium_token', res.token); 
          }
          if( res.user.role=='user'){
          localStorage.setItem('auth_token', res.token); 
          }
          if(res.user.role=='admin'){
            localStorage.setItem('admin_token', res.token); 
          }
        
          window.location.reload()
          },
          error: (err) => {
            this.invalid=err.error.message;
            this.authenticated = !!localStorage.getItem('email');
            }
            });
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; 
  }
  

}
