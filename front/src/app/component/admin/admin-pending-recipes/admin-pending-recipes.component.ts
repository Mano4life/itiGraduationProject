import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RecipesService } from '../../../core/services/recipes/recipes.service';

@Component({
  selector: 'app-admin-pending-recipes',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './admin-pending-recipes.component.html',
  styleUrl: './admin-pending-recipes.component.css'
})
export class AdminPendingRecipesComponent {

  constructor(private recipesServices: RecipesService) {}

  recipes!: any;
  users!: any;
  ngOnInit() {
    // Get all recipes
    this.recipesServices.getRecipes().subscribe((res) => {
      this.recipes = res;
    });
  }

  activeSection: string = 'pendingRecipes';
  // Method to switch sections
  changeSection(section: string) {
    this.activeSection = section;
  }
}
