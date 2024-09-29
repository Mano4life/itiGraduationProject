import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PendingRecipesService } from '../../../core/services/pendinRecipes/pending-recipes.service';
import { RecipesService } from '../../../core/services/recipes/recipes.service';

@Component({
  selector: 'app-admin-pending-recipes',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './admin-pending-recipes.component.html',
  styleUrl: './admin-pending-recipes.component.css'
})
export class AdminPendingRecipesComponent {

  constructor(private pendingRecipesServices: PendingRecipesService) {}

  pendingRecipes!: any;
  ngOnInit() {
    // Get all pending recipes
    this.getAllPendingRecipes();
  }

  getAllPendingRecipes(){
    this.pendingRecipesServices.getPendingRecipes().subscribe((res) => {
      this.pendingRecipes = res;
      console.log(this.pendingRecipes);
    });
  }

  deletePendingRecipe(id:any){
    this.pendingRecipesServices.deletePendingRecipe(id).subscribe({
      next: () => {
        this.getAllPendingRecipes();
        
      },
    error: (err) => {
        console.error('Error deleting pending recipes:', err);
      }
    })
  }
}
