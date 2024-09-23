import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  touched!: boolean;
  passwordMismatch!: boolean;

  constructor(){
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),

      email: new FormControl('', [Validators.required, Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),

      pass: new FormControl('', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%]).{8,}$/)]),
      confirmPass: new FormControl('', [Validators.required, Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%]).{8,}$/)]),

      DoB: new FormControl('', [Validators.required]),

      gender: new FormControl('', [Validators.required]),
    })
  }
  
  registerSender(){
    console.log(this.registerForm);
    
    if(this.registerForm.controls['pass'].value != this.registerForm.controls['confirmPass'].value ){
      console.log(this.registerForm.controls['pass'].value)
      console.log(this.registerForm.controls['confirmPass'].value)
      return false
    }

    if(this.registerForm.valid){
      console.log("Your Form is valid", this.registerForm.value);
      return true;
    } else {
        console.log("Your Form is Invalid", this.registerForm.value);
        return false;
    }
  }

}
