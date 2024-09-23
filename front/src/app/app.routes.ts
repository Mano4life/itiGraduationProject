import { Routes } from '@angular/router';
import { SingleRecipeComponent } from './component/single-recipe/single-recipe.component';
import { RecipesComponent } from './component/recipes/recipes.component';

export const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent
  },
  {
    path: 'recipes/:id', component: SingleRecipeComponent
  }
];
