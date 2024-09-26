import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm!: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(private router: Router) {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%]).{6,}$/)]),
    })
  }

  loginSender() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (storedUser.email === this.LoginForm.value.email && storedUser.pass === this.LoginForm.value.pass) {
      console.log('Login successful');
      this.router.navigate(['']);
    } else {
      console.log('Invalid email or password');
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; 
  }
  

}
