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

  constructor(private router: Router,private serv:UsersService) {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%]).{6,}$/)
      ]),
    })
  }

  loginSender() {
    if (this.LoginForm.valid) {
      const Store = this.LoginForm.value;
      const dataToStore = {
        email: Store.email,
        password: Store.password
      };

      this.serv.login(dataToStore).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('auth_token', res.token); 
          this.router.navigate(['/']);
          window.location.reload()
          },
          error: (err) => {
            this.invalid=err.error.message;
            }
            });
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; 
  }
  

}
