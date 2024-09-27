import { Routes } from '@angular/router';
import { SingleRecipeComponent } from './component/single-recipe/single-recipe.component';
import { HomeComponent } from './component/home/home.component';
import { RecipesComponent } from './component/recipes/recipes.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EditProfileComponent } from './component/profile/edit-profile/edit-profile.component';
import { AddRecipeComponent } from './component/add-recipe/add-recipe.component';
import { AboutComponent } from './component/about/about.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

export const routes: Routes = [

  {
    path: '', component: HomeComponent
  },
  {
    path:'about',component: AboutComponent
  },
  {
    path: 'profile/:id', component: ProfileComponent
  },
  {
    path: 'edit-profile/:id', component: EditProfileComponent
  },
  {
    path: 'add-recipe/:id', component: AddRecipeComponent
  },
  {
    path: 'recipes', component: RecipesComponent
  },
  {
    path: 'recipes/:id', component: SingleRecipeComponent
  },
  { 
    path: '**', component:NotFoundComponent 
  },

];
