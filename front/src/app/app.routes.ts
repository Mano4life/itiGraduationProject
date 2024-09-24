import { Routes } from '@angular/router';
import { SingleRecipeComponent } from './component/single-recipe/single-recipe.component';
import { RecipesComponent } from './component/recipes/recipes.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EditProfileComponent } from './component/profile/edit-profile/edit-profile.component';
import { AddRecipeComponent } from './component/add-recipe/add-recipe.component';

export const routes: Routes = [
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'profile/edit-profile', component: EditProfileComponent
  },
  {
    path: 'profile/add-recipe', component: AddRecipeComponent
  },
  {
    path: 'recipes', component: RecipesComponent
  },
  {
    path: 'recipes/:id', component: SingleRecipeComponent
  }
];
