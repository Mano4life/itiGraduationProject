import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-otp-validator',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
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
      OTPSender(){
        if (this.OTPForm.valid) {
          const email=localStorage.getItem('email');
          const otpvalue:number=this.OTPForm.value.otp
          const data={
            otp:otpvalue,
            email:email

          }
          console.log(data)
          this.serv.otp(data).subscribe({
            next: (res) => {
              console.log(res);
              this.router.navigate(['/']);
              localStorage.removeItem('email');
              },
              error: (err) => {
                this.invalid=err.error.message;
              }
          })
            }
          }

}

