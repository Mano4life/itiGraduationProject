import { Routes } from '@angular/router';
import { SingleRecipeComponent } from './component/single-recipe/single-recipe.component';
import { HomeComponent } from './component/home/home.component';
import { RecipesComponent } from './component/recipes/recipes.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  { path: 'signUp', component:RegisterComponent },
  { path: 'signIn', component:LoginComponent },
  {
    path: 'recipes', component: RecipesComponent
  },
  {
    path: 'recipes/recipe', component: SingleRecipeComponent
  }
];
