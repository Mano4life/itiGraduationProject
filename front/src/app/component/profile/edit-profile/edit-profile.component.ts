import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../core/services/users/users.service';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;
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
  success:boolean=false;
  constructor(private routerActive:ActivatedRoute,private router:Router,private serv:UsersService ,private renderer: Renderer2) { 

    this.EditForm=new FormGroup({
      Username: new FormControl('', Validators.required),
      DOB: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      
    })
  }
  ngOnInit() {
    console.log(this.EditForm);
    this.UserId=this.routerActive.snapshot.params['id']
    this.serv.getUser().subscribe((response:any)=>{
      this.UserList=response;
      this.populateForm();
      
    })
    const modalElement = document.getElementById('Edit');
    if (modalElement) {
      this.renderer.listen(modalElement, 'hidden.bs.modal', () => {
        this.success = false; // Reset the success flag
      });
    }
    
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
      gender:this.EditForm.value.gender,
      role:this.UserList.role
    }
    console.log(data)
    if(this.EditForm.valid){
      this.notvalid=false;
      this.serv.EditUser(data).subscribe({
        next:(res:any)=>{
          this.success=true;
          window.location.reload()
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
