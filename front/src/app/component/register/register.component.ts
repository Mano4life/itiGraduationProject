import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import jQuery from 'jquery';
const $ = jQuery;
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  notvalid: any;
  touched!: boolean;

  constructor(private router: Router, private usersService: UsersService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%&*])[A-Za-z\d@$#%&*]{6,}$/),
      ]),
      confirmPass: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%&*])[A-Za-z\d@$#%&*]{6,}$/),
      ]),
      DoB: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  registerSender() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      // Format date of birth to yyyy-mm-dd
      const dob = new Date(userData.DoB);
      const formattedDob = `${dob.getFullYear()}-${String(
        dob.getMonth() + 1
      ).padStart(2, '0')}-${String(dob.getDate()).padStart(2, '0')}`;

      const dataToStore = {
        name: userData.name,
        email: userData.email,
        password: userData.pass,
        role: 'user',
        date_of_birth: formattedDob,
        gender: userData.gender,
      };
      this.notvalid = false;
      this.usersService.register(dataToStore).subscribe({
        next: (res) => {
          
          localStorage.setItem('email',dataToStore.email)
          this.router.navigate(['/otp']);
          $('#registerModal').modal('hide');
        },
        error: (err) => {
          this.notvalid=err.error.message;
        },
      });
    } else {
      this.notvalid = true;
    }
  }

  // Toggle password visibility
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}
