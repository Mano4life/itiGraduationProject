import { CommonModule } from '@angular/common';
import { Component, Input, Renderer2 } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../core/services/users/users.service';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css'
})
export class SocialsComponent {
  LinksForm!:FormGroup;
  LinksList:any;
  gender: any = ['female', 'male'];
  notvalid:boolean=false;
  success:boolean=false;

  constructor(private routerActive:ActivatedRoute,private router:Router,private serv:UsersService ,private renderer: Renderer2) { 

    this.LinksForm=new FormGroup({
      youtube_link: new FormControl(''),
      instagram_link: new FormControl(''),
      tiktok_link: new FormControl(''),
      bio:new FormControl(''),
      
    })
  }
  ngOnInit() {
    console.log(this.LinksForm);
    this.serv.getUser().subscribe({
      next: (res) => {
        this.LinksList=res
        this.populateForm()
        },
        error: (err) => {
          console.error(err);
          }
    })
    const modalElement = document.getElementById('Socials');
    if (modalElement) {
      this.renderer.listen(modalElement, 'hidden.bs.modal', () => {
        this.success = false; 
      });
    }
    
  }
  populateForm() {
    this.LinksForm.patchValue({
      youtube_link: this.LinksList.youtube_link,
      instagram_link: this.LinksList.instagram_link,
      tiktok_link: this.LinksList.tiktok_link,
      bio:this.LinksList.bio
      
    });


  }
  
  Link(){
    var data={
      youtube_link: this.LinksForm.value.youtube_link,
      instagram_link: this.LinksForm.value.instagram_link,
      tiktok_link: this.LinksForm.value.tiktok_link,
      
    }
    var bio={
      bio:this.LinksForm.value.bio
    }
    if(this.LinksForm.valid){
      this.notvalid=false;
      this.serv.putSocialMedia(data).subscribe({
        next: (res) => {
          this.success = true;
          window.location.reload()
        },
        error: (err) => {
          console.error(err);
          this.notvalid=true;
          }
      })
      
    }
    else{
      this.notvalid=true;
    }
    this.serv.putBio(bio).subscribe({
      next: (res) => {
      },
      error: (err) => {
        console.error(err);
        }
    })
  }

}
