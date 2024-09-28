import { Component } from '@angular/core';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { UsersService } from '../../core/services/users/users.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

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

    this.activatedRoute.paramMap.subscribe((params) => {
      const userId = params.get('id');
      this.usersService.getUser().subscribe((res) => {
        this.user = res;
        console.log(this.user);
      });
    });
  }

  onRecipeClick(id: number) {
    this.router.navigate(['/recipes', id]);
  }
}
