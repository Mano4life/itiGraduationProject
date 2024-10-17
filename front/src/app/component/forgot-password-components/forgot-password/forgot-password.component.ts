import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../../core/services/forgot-password/forgot-password.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  EmailForm!: FormGroup;
  sendEmail:string='';
  invalid:any;
  constructor(private forgotPasswordService:ForgotPasswordService, private router:Router){
    this.EmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
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
            localStorage.setItem('forgotPasswordEmail',dataToStore.email)
            this.router.navigate(['/verify-code']);
        },
        error: (err) => {
          this.invalid=err.error.message;
        }
      })
    }
  }
 
  
  
}
