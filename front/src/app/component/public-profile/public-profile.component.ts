import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent {
  publicProfile:any;
  profileId:any;
  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.profileId=this.activatedRoute.snapshot.params['id']
    this.usersService.publicProfile(this.profileId).subscribe((data:any)=>{
      this.publicProfile=data;
      })

  }
  onRecipeClick(id: number) {
    this.router.navigate(['/recipes', id]);
  }
}
