import { Component } from '@angular/core';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import {
  Router,
  NavigationEnd,
  RouterLink,
  ActivatedRoute,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [NgFor, RouterLink, NgClass],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css',
})
export class SingleRecipeComponent {
  recipe: any;
  ingredient: any;
  ingredientId: any;
  scrollPosition: number = 0;
  routerSubscription!: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const recipeId = params.get('id');

      // Fetch the recipe based on recipe ID
      if (recipeId) {
        this.recipesService.getSingleRecipe(recipeId).subscribe((res) => {
          this.recipe = res;
          console.log(res);
          this.ingredientId = this.recipe.ingredients[0].id;

          // Fetch ingredients related to the recipe
          if (this.ingredientId) {
            this.recipesService
              .getIngredient(this.ingredientId)
              .subscribe((res) => {
                this.ingredient = res;
              });
          }
        });
      }
    });
  }

  onRecipeClick(id: number) {
    this.router.navigate(['/recipes', id]);
  }

// mariaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaam bom
  convertRatingToStars(rating: number) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const fullStarIcon = '<i class="fa-solid fa-star mb-4"></i>';
    const halfStarIcon = '<i class="fa-solid fa-star-half-alt mb-4"></i>';
    const emptyStarIcon = '<i class="fa-regular fa-star mb-4"></i>';

    return (
      fullStarIcon.repeat(fullStars) +
      halfStarIcon.repeat(halfStar) +
      emptyStarIcon.repeat(emptyStars)
    );
  }

  isSolid = false;
  onFavorite(){
    this.isSolid = !this.isSolid;
  }

  stars = Array(5);
  currentHoveredStar = 0;
  starRate!: number;
  onStarHover(starValue: number) {
    this.currentHoveredStar = starValue;
  }
  onStarLeave() {
    this.currentHoveredStar = 0;
  }
  onStarClick(starValue: number) {
    console.log(`You clicked ${this.starRate} star(s)`);
    return this.starRate = starValue;
    // Handle backend logic here if needed
  }

  // convertRatingToStars(rating: any) {
  //   const fullStars = Math.floor(rating);
  //   // 4.5, rating % 1 would be 0.5.
  //   const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  //   // 4.5, full = 4, half = 1 because 0.5 = 0.5 return 1
  //   const emptyStars = 5 - fullStars - halfStar;

  //   return '★'.repeat(fullStars) +  '☆'.repeat(halfStar) + '☆'.repeat(emptyStars);
  // }
}
