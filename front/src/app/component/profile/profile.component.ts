import { Component } from '@angular/core';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor, RouterLink],
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
      this.usersService.getUser(userId).subscribe((res) => {
        this.user = res;
        console.log(this.user);
      });
    });
  }

  onRecipeClick(id: number) {
    this.router.navigate(['/recipes', id]);
  }
}
