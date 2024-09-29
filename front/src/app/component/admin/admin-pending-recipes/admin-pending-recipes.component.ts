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
    const deniedRecipe = this.pendingRecipes.find( (recipe:any) => recipe.id === id);

    if(deniedRecipe){
      deniedRecipe.status = 'denied';
      console.log(deniedRecipe.id);
      console.log(deniedRecipe.status);
    }
  
    this.pendingRecipesService.updatePendingRecipes(id, deniedRecipe).subscribe({
      next: () => {
        console.log('Recipe status updated to denied');
        // Optionally, you can fetch the updated data again:
        // this.getAllPendingRecipes();
      },
      error: (err) => {
        console.error('Error updating recipe status:', err);
      }
    });
  }
}
