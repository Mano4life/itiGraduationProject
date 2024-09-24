import { Routes } from '@angular/router';
import { SingleRecipeComponent } from './component/single-recipe/single-recipe.component';
import { HomeComponent } from './component/home/home.component';
import { RecipesComponent } from './component/recipes/recipes.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EditProfileComponent } from './component/profile/edit-profile/edit-profile.component';
import { AddRecipeComponent } from './component/add-recipe/add-recipe.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  { path: 'signUp', component:RegisterComponent },
  { path: 'signIn', component:LoginComponent },
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
