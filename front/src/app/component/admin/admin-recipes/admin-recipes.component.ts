import { Component } from '@angular/core';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/users/users.service';

@Component({
  selector: 'app-admin-recipes',
  standalone: true,
  imports: [TableModule,CommonModule,FormsModule, RouterLink],
  templateUrl: './admin-recipes.component.html',
  styleUrl: './admin-recipes.component.css'
})
export class AdminRecipesComponent {

  constructor(private recipesServices: RecipesService, private router: Router, private adminService:UsersService) {}
  
  admin!:any;
  recipes!: any;
  ngOnInit() {
    // Get all recipes
    this.getAllRecipes();

    this.adminService.getUser().subscribe((res) => {
      this.admin = res;
      console.log(res);
      
    })
  }

  // Get all recipes
  getAllRecipes(){
    this.recipesServices.getRecipes().subscribe((res) => {
      this.recipes = res;
    });
  }

  deleteRecipe(id:number){
    this.recipesServices.deleteRecipe(id).subscribe({
      next: () => {
        this.getAllRecipes();
      },
    error: (err) => {
        console.error('Error deleting recipe:', err);
      }
    })
  }

  editRecipe(id:number){
    this.router.navigate(['/admin-edit-recipes',id]);
  }
}
