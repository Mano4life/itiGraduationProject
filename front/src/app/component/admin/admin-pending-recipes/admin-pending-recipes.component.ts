import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PendingRecipesService } from '../../../core/services/pendinRecipes/pending-recipes.service';

@Component({
  selector: 'app-admin-pending-recipes',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './admin-pending-recipes.component.html',
  styleUrl: './admin-pending-recipes.component.css'
})
export class AdminPendingRecipesComponent {

  constructor(private pendingRecipesService: PendingRecipesService) {}

  pendingRecipes!: any;
  ngOnInit() {
    // Get all pending recipes
    this.getAllPendingRecipes();
  }

  getAllPendingRecipes(){
    this.pendingRecipesService.getPendingRecipes().subscribe((res) => {
      this.pendingRecipes = res;
      console.log(this.pendingRecipes);
    });
  }

  // Delete a pending recipe
  deletePendingRecipe(id:number){
    this.pendingRecipesService.deletePendingRecipes(id).subscribe({
      next: () => {
        this.getAllPendingRecipes();
      },
    error: (err) => {
        console.error('Error deleting pending recipes:', err);
      }
    })
  }

  // Deny a pending recipe
  denyRecipe(id:number){
    this.pendingRecipes.filter( (recipe:any) => {
      if(recipe.id === id){
        recipe.status = 'denied';
        console.log(recipe.status);
        
        this.pendingRecipesService.updatePendingRecipes(recipe).subscribe({
          next: () => {
            
            this.getAllPendingRecipes();
          },
        })
      }
    })
  }
}
