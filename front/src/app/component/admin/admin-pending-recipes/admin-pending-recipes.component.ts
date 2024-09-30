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

  constructor(private pendingRecipesService: PendingRecipesService,private recipe:RecipesService ) {}
  newrecipe:any;
  pendingRecipes!: any;
  ngOnInit() {
    // Get all pending recipes
    this.getAllPendingRecipes();
  }

  getAllPendingRecipes(){
    this.pendingRecipesService.getPendingRecipes().subscribe((res) => {
      this.pendingRecipes = res;
      console.log("pending",this.pendingRecipes);
    });
  }
  posttorecipe(id:any){
    this.pendingRecipesService.getOnePendingRecipe(id).subscribe((res)=>{
      this.newrecipe=res;
      this.recipe.postRecipe(this.newrecipe).subscribe((res)=>{
        console.log(res);
      })
    })
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
    }
  
    this.pendingRecipesService.denyPendingRecipes(id, { status: 'denied'}).subscribe({
      next: () => {
        console.log('Recipe status updated to denied');
      },
      error: (err) => {
        console.error('Error Dening recipe status:', err);
      }
    });
  }
}
