import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ForgotPasswordService } from '../../../core/services/forgot-password/forgot-password.service';


@Component({
  selector: 'app-send-code',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.css'
})
export class SendCodeComponent {
  CodeForm!: FormGroup;
  invalid:any;
  email:any;
  constructor(private forgotPasswordService:ForgotPasswordService, private router:Router){
    this.CodeForm  = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(4) ])
      });
      
  }
  ngOnInit() {
    if(localStorage.getItem('forgotPasswordEmail')){
      this.email = localStorage.getItem('forgotPasswordEmail');
    }
  }
 
    CodeConfirmation(){
      if(this.CodeForm.valid){
        console.log("This is shared:", this.email); 
        const Store = this.CodeForm.value;
        const dataToStore = {
          token: Store.code,
          email: this.email
          };
          this.forgotPasswordService.validateCode(dataToStore).subscribe({
            next: (res) => {
              console.log(res);
              localStorage.setItem('forgotPasswordCode',dataToStore.token);
              this.router.navigate(['/reset-password']);
            },
            error: (err) => {
            this.invalid=err.error.message;
            }
            
          })
          }
    }

}
