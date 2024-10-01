import { Component } from '@angular/core';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { UsersService } from '../../core/services/users/users.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
declare var bootstrap: any;
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink,EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  recipes!: any;
  user!: any;
  isPremium:boolean = false;
  constructor(
    private recipesService: RecipesService,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipesService.getRecipes().subscribe((res) => {
      this.recipes = res;
    });

    
      this.usersService.getUser().subscribe((res) => {
        this.user = res;
        if(this.user.role == 'premium' || this.user.role == 'admin'){
          this.isPremium = true;
         
        }
        console.log("output",this.user)
      });
 
  }

  onRecipeClick(id: number) {
    this.router.navigate(['/recipes', id]);
  }
}
