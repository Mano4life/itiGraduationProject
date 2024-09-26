import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../core/services/users/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  EditForm!:FormGroup;
  UserList:any;
  UserId!:number;
  gender: any = ['female', 'male'];
  notvalid:boolean=false;
  constructor(private routerActive:ActivatedRoute,private router:Router,private serv:UsersService) { 

    this.EditForm=new FormGroup({
      Username: new FormControl('', Validators.required),
      DOB: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      
    })
  }
  ngOnInit() {
    console.log(this.EditForm);
    this.UserId=this.routerActive.snapshot.params['id']
    this.serv.getUser(this.UserId).subscribe((response:any)=>{
      this.UserList=response;
      this.populateForm();
      
    })
    
  }
  populateForm() {
    this.EditForm.patchValue({
      Username: this.UserList.name,
      DOB: this.UserList.date_of_birth,
      gender: this.UserList.gender
      
    });


  }
  EditUser(){
    var data={
      name:this.EditForm.value.Username,
      date_of_birth:this.EditForm.value.DOB,
      gender:this.EditForm.value.gender
    }
    console.log(data)
    if(this.EditForm.valid){
      this.notvalid=false;
      this.serv.EditUser(data,this.UserId).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert("data is updated")
          this.router.navigate(['/profile',this.UserId]);
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
