import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
declare var bootstrap: any;
@Component({
  selector: 'app-otp-validator',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './otp-validator.component.html',
  styleUrl: './otp-validator.component.css'
})
export class OtpValidatorComponent {
  OTPForm!: FormGroup;
  invalid:any;
  constructor(private router: Router,private serv:UsersService) {
    this.OTPForm = new FormGroup({
      otp: new FormControl('', Validators.required)
      });
      }
      OTPSender(modal:string){
        if (this.OTPForm.valid) {
          const email=localStorage.getItem('email');
          const otpvalue:number=this.OTPForm.value.otp
          const data={
            otp:otpvalue,
            email:email

          }
          this.serv.otp(data).subscribe({
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

}

