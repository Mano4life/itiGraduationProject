import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '../../core/services/users/users.service';
import { AdminUserComponent } from "./admin-user/admin-user.component";
import { AdminRecipesComponent } from "./admin-recipes/admin-recipes.component";
import { AdminPendingRecipesComponent } from "./admin-pending-recipes/admin-pending-recipes.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableModule, CommonModule, PaginatorModule, ButtonModule, AdminUserComponent,
      AdminRecipesComponent, AdminPendingRecipesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  p: number = 1;

  constructor(private recipesServices: RecipesService, private usersService: UsersService) {}

  recipes!: any;
  users!: any;
  ngOnInit() {
    // Get all recipes
    this.recipesServices.getRecipes().subscribe((res) => {
      this.recipes = res;
    });

    // Get all users
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;
      
    })
  }

  activeSection: string = 'pendingRecipes';
  // Method to switch sections
  changeSection(section: string) {
    this.activeSection = section;
  }

  // Edit Recipes
  editRecipe(data: any) {

  }
}
