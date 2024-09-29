import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  notvalid:boolean=false;
  touched!: boolean;


  registerForm!: FormGroup;
  constructor(private router: Router,private serv:UsersService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),

      email: new FormControl('', [Validators.required, Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),

      pass: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.pattern(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$#%]).{6,}$/)]),
      confirmPass: new FormControl('', [Validators.required, Validators.minLength(8),
          Validators.pattern(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$#%]).{6,}$/)]),

      DoB: new FormControl('', [Validators.required]),

      gender: new FormControl('', [Validators.required]),
    })
  }
  
//   registerSender() {
//     if (this.registerForm.valid) {
//         const userData = this.registerForm.value;
//         console.log("this is register form ",this.registerForm)
//         // Format date of birth to yyyy-mm-dd
//         const dob = new Date(userData.DoB);
//         const formattedDob = `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(2, '0')}-${String(dob.getDate()).padStart(2, '0')}`;

//         const dataToStore = {
//             name: userData.name,
//             email: userData.email,
//             password: userData.pass,
//             date_of_birth: formattedDob,
//             gender: userData.gender,
//             role:"user"
//         }
//         this.notvalid = false;
//         this.serv.register(dataToStore).subscribe({
//           next: (res) => {
//             this.router.navigate(['/login']);
//             },
//             error: (err) => {
//               this.notvalid = true;
//               console.log(err);
//             }

//         }) 
//     }
//     else {
//       this.notvalid = true;
//     }
// }

  

  registerSender(){
    if (this.registerForm.valid) {
      const formData = {
        name:this.registerForm.controls['name'].value,
        email:this.registerForm.controls['email'].value,
        password:this.registerForm.controls['pass'].value,
        date_of_birth:this.registerForm.controls['DoB'].value,
        gender:this.registerForm.controls['gender'].value,
        role:'user'
      };
      this.notvalid = false;
      this.serv.register(formData).subscribe({
        next: (res) => {
          console.log(res);
          //this.router.navigate(['/UserLogin']);
        },
        error: (err) => {
          console.error('Error:', err);
          this.notvalid = true;
        }
      });
    } else {
      this.notvalid = true;
    }
  }

  // Toggle password visibility
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  togglePasswordVisibility(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility(){
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}
