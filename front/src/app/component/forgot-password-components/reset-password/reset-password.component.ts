import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ForgotPasswordService } from '../../../core/services/forgot-password/forgot-password.service';

declare var bootstrap: any;
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  NewPassForm!: FormGroup;
  invalid:any;
  email:any;
  code:any;
  constructor(private forgotPasswordService:ForgotPasswordService, private router:Router){
    this.NewPassForm = new FormGroup({
      pass: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%&*])[A-Za-z\d@$#%&*]{6,}$/)
      ]),
      confirmPass: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%&*])[A-Za-z\d@$#%&*]{6,}$/)])
      
      });
  }
  ngOnInit() {
    if(localStorage.getItem('forgotPasswordEmail') && localStorage.getItem('forgotPasswordCode')){
      this.email = localStorage.getItem('forgotPasswordEmail');
      this.code=localStorage.getItem('forgotPasswordCode');
    }
  }
 
    SendNewPassword(modal:string){
      if(this.NewPassForm.valid){
        const Store = this.NewPassForm.value;
        const dataToStore = {
          password: Store.pass,
          email: this.email,
          token: this.code
          };
          this.forgotPasswordService.resetPassword(dataToStore).subscribe({
            next: (res) => {
              const nextModalEl = document.getElementById(modal);
                const nextModalInstance = new bootstrap.Modal(nextModalEl);
                nextModalInstance.show();
                localStorage.removeItem('forgotPasswordCode');
                localStorage.removeItem('forgotPasswordEmail');
                this.router.navigate(['']);
            },
            error: (err) => {
              this.invalid=err.error.message;
              }
            })
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
