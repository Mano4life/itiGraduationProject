import { Routes } from '@angular/router';
import { SingleRecipeComponent } from './component/single-recipe/single-recipe.component';
import { HomeComponent } from './component/home/home.component';
import { RecipesComponent } from './component/recipes/recipes.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EditProfileComponent } from './component/profile/edit-profile/edit-profile.component';
import { AddRecipeComponent } from './component/profile/add-recipe/add-recipe.component';
import { AboutComponent } from './component/about/about.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { OtpValidatorComponent } from './component/otp-validator/otp-validator.component';
import { userGuard } from './guard/user.guard';
import { AdminComponent } from './component/admin/admin.component';
import { AdminEditRecipesComponent } from './component/admin/admin-edit-recipes/admin-edit-recipes.component';
import { AdminEditUserComponent } from './component/admin/admin-edit-user/admin-edit-user.component';
import { AdminEditPendingRecipesComponent } from './component/admin/admin-edit-pending-recipes/admin-edit-pending-recipes.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PaymentCancelComponent } from './component/payment/payment-cancel/payment-cancel.component';
import { PaymentSuccessComponent } from './component/payment/payment-success/payment-success.component';
import { adminGuard } from './guard/admin.guard';
import { AdminAddRecipeComponent } from './component/admin/admin-add-recipe/admin-add-recipe.component';
import { premiumGuard } from './guard/premium.guard';
import { ForgotPasswordComponent } from './component/forgot-password-components/forgot-password/forgot-password.component';
import { EditRecipeComponent } from './component/profile/edit-recipe/edit-recipe.component';
import { SendCodeComponent } from './component/forgot-password-components/send-code/send-code.component';
import { ResetPasswordComponent } from './component/forgot-password-components/reset-password/reset-password.component';
import { otpGuard } from './guard/otp.guard';
import { PublicProfileComponent } from './component/public-profile/public-profile.component';

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
    path: 'public-profile/:id',
    component: PublicProfileComponent
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
    path: 'edit-recipe/:id',
    component:EditRecipeComponent,
    canActivate: [premiumGuard]
  },
  
  {
    path: 'recipes/:id',
    component: SingleRecipeComponent,
  },
  {
    path: 'otp',
    component: OtpValidatorComponent,
    canActivate:[otpGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'verify-code',
    component: SendCodeComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,canActivate:[adminGuard]
  },
  {
    path: 'admin-edit-recipes/:id', component: AdminEditRecipesComponent,canActivate:[adminGuard]
  },
  {
    path:'admin-edit-user/:id',component:AdminEditUserComponent,canActivate:[adminGuard]
  },
  {
    path: 'admin-edit-pendingRecipes/:id', component: AdminEditPendingRecipesComponent,canActivate:[adminGuard]
  },
  {
    path: 'admin-add-recipes/:id', component: AdminAddRecipeComponent,canActivate:[adminGuard]
  },
  { 
    
    path: 'payment',
    component: PaymentComponent,
    canActivate: [userGuard],
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
