import { Component } from '@angular/core';
import { UsersService } from '../../../core/services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-edit-user.component.html',
  styleUrl: './admin-edit-user.component.css'
})
export class AdminEditUserComponent {
  EditForm!:FormGroup;
  UserList:any;
  SingleUserEdit:any;
  UserId!:number;
  gender: any = ['female', 'male'];
  notvalid:boolean=false;
  constructor(private routerActive:ActivatedRoute,private router:Router,private serv:UsersService ) { 

    this.EditForm=new FormGroup({
      Username: new FormControl('', Validators.required),
      DOB: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      role: new  FormControl('', Validators.required),

      
    })
  }
  ngOnInit() {
    this.UserId=this.routerActive.snapshot.params['id']
    this.serv.getUsers().subscribe((res:any)=>{
      this.SingleUserEdit=res;
       const singleUser = this.SingleUserEdit.find( (user:any) => user.id == this.UserId);
      this.UserList=singleUser;
      console.log("user list",this.SingleUserEdit)
      this.populateForm();
      
      
    })
  }
  populateForm() {
    this.EditForm.patchValue({
      Username: this.UserList.name,
      DOB: this.UserList.date_of_birth,
      gender: this.UserList.gender,
      Email: this.UserList.email,
      role: this.UserList.role
      
    });


  }
  EditUser(){
    var data={
      name:this.EditForm.value.Username,
      date_of_birth:this.EditForm.value.DOB,
      gender:this.EditForm.value.gender,
      email:this.EditForm.value.Email,
      role:this.EditForm.value.role
    }
    console.log(data)
    if(this.EditForm.valid){
      this.notvalid=false;
      this.serv.adminEditUser(this.UserId,data).subscribe({
        next:(res:any)=>{
          
          this.router.navigate(['/admin']);

        },
        error:(err:any)=>{
          console.log(err)
        }
      })
      
      
      
    }
    else{
      this.notvalid=true;
    }
    
  }
}
