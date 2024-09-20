import { Routes } from '@angular/router';
import { SingleRecipeComponent } from './component/single-recipe/single-recipe.component';

export const routes: Routes = [
  {
    path: 'recipes/recipe', component: SingleRecipeComponent
  }
];
