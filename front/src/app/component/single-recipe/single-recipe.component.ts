import { Component } from '@angular/core';
import { RecipesService } from '../../core/services/recipes.service';
import {
  Router,
  NavigationEnd,
  RouterLink,
  ActivatedRoute,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css',
})
export class SingleRecipeComponent {
  recipe: any;
  ingredient: any;
  scrollPosition: number = 0;
  routerSubscription!: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const recipeId = params.get('id');
      
      // Fetch the recipe based on recipe ID
      if (recipeId) {
        this.recipesService.getSingleRecipe(recipeId).subscribe((res) => {
          this.recipe = res;
          console.log(this.recipe);
        });
      }
  
      // Fetch ingredients related to the recipe
      this.recipesService.getIngredient().subscribe((res) => {
        this.ingredient = res;
        console.log(this.ingredient);
      });
    });
  }

  onRecipeClick(id: number) {
    this.router.navigate(['/recipes', id]);
  }
}
