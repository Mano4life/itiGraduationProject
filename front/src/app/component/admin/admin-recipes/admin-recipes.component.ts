import { Component } from '@angular/core';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-admin-recipes',
  standalone: true,
  imports: [TableModule,CommonModule,FormsModule],
  templateUrl: './admin-recipes.component.html',
  styleUrl: './admin-recipes.component.css'
})
export class AdminRecipesComponent {
  
  constructor(private recipesServices: RecipesService) {}

  recipes!: any;
  ngOnInit() {
    // Get all recipes
    this.recipesServices.getRecipes().subscribe((res) => {
      this.recipes = res;
      console.log(res);
      
    });
  }

  selectedRecipe: any = null;
  setSelectedRecipe(recipes:any){
    this.selectedRecipe = [...recipes];
  }
}
