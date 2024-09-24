import { Routes } from '@angular/router';
import { SingleRecipeComponent } from './component/single-recipe/single-recipe.component';
import { RecipesComponent } from './component/recipes/recipes.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

export const routes: Routes = [
  {
    path: 'recipes/form', component: RecipeFormComponent
  },
  {
    path: 'recipes', component: RecipesComponent
  },
  {
    path: 'recipes/:id', component: SingleRecipeComponent
  }
];
