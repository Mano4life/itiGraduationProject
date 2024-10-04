import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../core/services/forgot-password/forgot-password.service';
import { Router, RouterLink } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  EmailForm!: FormGroup;
  CodeForm!: FormGroup;
  NewPassForm!: FormGroup;
  emailDiv:boolean=true;
  codeDiv:boolean=false;
  resetpassDiv:boolean=false;
  invalid:any;
  constructor(private forgotPasswordService:ForgotPasswordService, private router:Router){
    this.EmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
      });
    this.CodeForm  = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(4) ])
      });
      this.NewPassForm = new FormGroup({
        pass: new FormControl('', [Validators.required, Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%&*])[A-Za-z\d@$#%&*]{6,}$/)
        ]),
        confirmPass: new FormControl('', [Validators.required, Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%&*])[A-Za-z\d@$#%&*]{6,}$/)])
        
        });

  }
  SendEmail(){
    if(this.EmailForm.valid){
      const Store = this.EmailForm.value;
      const dataToStore = {
        email: Store.email
      };
      this.forgotPasswordService.forgotPassword(dataToStore).subscribe({
        next: (res) => {
          this.emailDiv=false;
          this.codeDiv=true;
          this.resetpassDiv=false;
        },
        error: (err) => {
          this.invalid=err.error.message;
        }
      })
    }
  }
  CodeConfirmation(){
    if(this.CodeForm.valid){
      const Store = this.CodeForm.value;
      const dataToStore = {
        token: Store.code,
        email: this.EmailForm.value.email
        };
        this.forgotPasswordService.validateCode(dataToStore).subscribe({
          next: (res) => {
            this.codeDiv=false;
            this.resetpassDiv=true;
            this.emailDiv=false;
          },
          error: (err) => {
          this.invalid=err.error.message;
          }
          
        })
        }
  }
  SendNewPassword(modal:string){
    if(this.NewPassForm.valid){
      const Store = this.NewPassForm.value;
      const dataToStore = {
        password: Store.pass,
        email: this.EmailForm.value.email,
        token: this.CodeForm.value.code
        };
        this.forgotPasswordService.resetPassword(dataToStore).subscribe({
          next: (res) => {
            const nextModalEl = document.getElementById(modal);
              const nextModalInstance = new bootstrap.Modal(nextModalEl);
              nextModalInstance.show();
              localStorage.removeItem('email');
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
