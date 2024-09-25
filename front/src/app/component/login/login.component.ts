import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm!: FormGroup;
  touched!: boolean;
  passwordMismatch!: boolean;

  constructor(){
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%]).{8,}$/)]),
    })
  }

  loginSender(){
    console.log(this.LoginForm.value);
  } 
}
