import { Routes } from '@angular/router';
import { SingleRecipeComponent } from './component/single-recipe/single-recipe.component';
import { HomeComponent } from './component/home/home.component';
import { RecipesComponent } from './component/recipes/recipes.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EditProfileComponent } from './component/profile/edit-profile/edit-profile.component';
import { AddRecipeComponent } from './component/add-recipe/add-recipe.component';
import { AboutComponent } from './component/about/about.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { OtpValidatorComponent } from './component/otp-validator/otp-validator.component';
import { userGuard } from './guard/user.guard';
import { AdminComponent } from './component/admin/admin.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PaymentCancelComponent } from './component/payment/payment-cancel/payment-cancel.component';
import { PaymentSuccessComponent } from './component/payment/payment-success/payment-success.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [userGuard],
  },
  {
    path: 'edit-profile/:id',
    component: EditProfileComponent,
    canActivate: [userGuard],
  },
  {
    path: 'add-recipe/:id',
    component: AddRecipeComponent,
    canActivate: [userGuard],
  },
  {
    path: 'recipes',
    component: RecipesComponent,
  },
  {
    path: 'recipes/:id',
    component: SingleRecipeComponent,
  },
  {
    path: 'otp',
    component: OtpValidatorComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'payment/success',
    component: PaymentSuccessComponent,
  },
  {
    path: 'payment/cancel',
    component: PaymentCancelComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
