import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import {
  Router,
  NavigationEnd,
  RouterLink,
  ActivatedRoute,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { UsersService } from '../../core/services/users/users.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
declare var bootstrap: any;
@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css',
})
export class SingleRecipeComponent implements OnInit  {
  commentForm!: FormGroup;
  recipe: any;
  ingredient: any;
  ingredientId: any;
  scrollPosition: number = 0;
  routerSubscription!: Subscription;
  originalServings: number = 1; // Store the original servings
  scaledIngredients: any[] = []; // To store scaled ingredients
  userlist: any;
  isFavorite = false;
  currentRecipeId: any;
  relatedRecipes: any;
  token:string='';
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private user: UsersService
  ) {
    this.commentForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
    });
  }
  

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const recipeId = params.get('id');
      // Fetch the recipe based on recipe ID
     this.getSingleRecipe(recipeId) 
    });
    this.getUser()
    this.gettoken()
  }
  gettoken(){
    if(localStorage.getItem('premium_token') || localStorage.getItem('admin_token')){
      this.token='premium'
    }
  }
  premiumRecipeClick(){
    const logged=localStorage.getItem('auth_token')
    if(logged){
      this.router.navigate(['/payment']);
    }
    else{
      const nextModalEl = document.getElementById('loginModal');
          const nextModalInstance = new bootstrap.Modal(nextModalEl);
          nextModalInstance.show();
    }
  }
getUser(){
  this.user.getUser().subscribe({
    next: (res) => {
      this.userlist = res.recipes_saves;
      this.isFavorite = this.userlist.some(
        (userRecipe: { id: any }) => userRecipe.id === this.recipe.id
      );
      this.isSolid = this.userlist.some(
        (userRecipe: { id: any }) => userRecipe.id === this.recipe.id
      );

      const val = res.ratings;
      console.log(val);

      const ratingUser = val.find(
        (userrating: { recipe_id: any }) =>
          userrating.recipe_id === this.recipe.id
      );
      this.starRate = ratingUser ? ratingUser.rating : 0;
    },
    error: (err) => {
      console.error(err);
    },
  });
}
  onRecipeClick(id: number) {
    this.router.navigate(['/recipes', id]);
    this.getUser();
  }

  selectedBtn: string[] = ['one'];
  getSingleRecipe(recipeId:any){
    this.recipesService.getSingleRecipe(recipeId).subscribe((res) => {
      console.log('single recipe', res);
      this.recipe = res;
      this.currentRecipeId = this.recipe.id;
      this.originalServings = this.recipe.servings; // Store original servings
      this.scaledIngredients = [...this.recipe.ingredients]; // Copy ingredients for scaling

      // Initialize an array to collect all related recipes
      let allRelatedRecipes: any[] = [];

      // Fetch ingredients related to the recipe and gather related recipes
      this.recipe.ingredients.forEach((ingredient:any) => {
        this.recipesService
          .getIngredient(ingredient.id)
          .subscribe((res) => {
            this.ingredient = res;
            // Collect related recipes from each ingredient
            this.ingredient.recipes.forEach((relatedRecipe: any) => {
              // Add the related recipe only if it's not the current recipe
              if (relatedRecipe.id !== this.currentRecipeId) {
                allRelatedRecipes.push(relatedRecipe);
              }
            });

            // Remove duplicate recipes
            this.relatedRecipes = allRelatedRecipes.filter(
              (recipe, index, self) =>
                index === self.findIndex((r) => r.id === recipe.id)
            );
            
          });
      });
    });
  }
  // Method to scale the ingredients
  scaleIngredients(scaleFactor: number) {
    this.recipe.servings = Math.trunc(this.originalServings * scaleFactor);

    this.scaledIngredients = this.recipe.ingredients.map((ingredient: any) => {
      return {
        ...ingredient,
        quantity: (ingredient.quantity * scaleFactor).toFixed(), 
      };
    });
  }

  toggleActive(btn: string) {
    this.selectedBtn = [];
    this.selectedBtn.push(btn);

    switch (btn) {
      case 'half':
        this.scaleIngredients(0.5);
        break;
      case 'one':
        this.scaleIngredients(1);
        break;
      case 'double':
        this.scaleIngredients(2);
        break;
    }
  }

  isBtnSelected(btn: string): boolean {
    return this.selectedBtn.includes(btn);
  }

  isActive = false;
  onActive() {
    this.isActive = !this.isActive;
  }

  isSolid = false;
  onFavorite(modal: string) {
    if(localStorage.getItem('auth_token') || localStorage.getItem('premium_token') ||  localStorage.getItem('admin_token')) {

      if (this.isSolid) {
        this.recipesService.unsaverecipe(this.recipe.id).subscribe({
          next: (res) => {
            console.log(res);
            this.isSolid = false;
            this.isFavorite = false;
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        this.recipesService.saverecipe(this.recipe.id).subscribe({
          next: (res) => {
            console.log(res);
            this.isSolid = true;
            this.isFavorite = true;
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    }else{
      const nextModalEl = document.getElementById(modal);
      const nextModalInstance = new bootstrap.Modal(nextModalEl);
      nextModalInstance.show();
    }
    
  }

  // Review Fav and Rating
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

  stars = Array(5).fill(0);
  currentHoveredStar = 0;
  starRate = 0;

  onStarHover(starValue: number) {
    this.currentHoveredStar = starValue;
  }

  onStarLeave() {
    this.currentHoveredStar = 0;
  }

  onStarClick(starValue: number, modal: string) {
    if(localStorage.getItem('admin_token') ||  localStorage.getItem('auth_token') ||  localStorage.getItem('premium_token')) {
      this.starRate = starValue;
      this.recipesService.rateRecipe(this.recipe.id, this.starRate).subscribe({
      next: (response) => {
        this.getSingleRecipe(this.recipe.id)
      },
      error: (error) => {
        console.error(error);
        
      },
    });
    }
    else{
        const nextModalEl = document.getElementById(modal);
        const nextModalInstance = new bootstrap.Modal(nextModalEl);
        nextModalInstance.show();
    }
  }
  comment(modal: string) {
    if(localStorage.getItem('admin_token') ||  localStorage.getItem('auth_token') ||  localStorage.getItem('premium_token')) {
      if (this.commentForm.valid) {
        console.log(this.commentForm.value);
        this.recipesService
          .comment(this.recipe.id, this.commentForm.value)
          .subscribe({
            next: (response) => {
              //window.location.reload();
              this.commentForm.reset();
              this.getSingleRecipe(this.recipe.id)
            },
            error: (error) => {
              console.error(error);
              
            },
          });
      }
    }
    else{
        const nextModalEl = document.getElementById(modal);
        const nextModalInstance = new bootstrap.Modal(nextModalEl);
        nextModalInstance.show();
    }
  }

}
