import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PendingRecipesService } from '../../../core/services/pendinRecipes/pending-recipes.service';
import { Router, RouterLink } from '@angular/router';
import { RecipesService } from '../../../core/services/recipes/recipes.service';

@Component({
  selector: 'app-admin-pending-recipes',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './admin-pending-recipes.component.html',
  styleUrl: './admin-pending-recipes.component.css'
})
export class AdminPendingRecipesComponent {

  constructor(private pendingRecipesService: PendingRecipesService,private recipe:RecipesService,private router:Router) {}
  
  newrecipe:any;
  pendingRecipes!: any;
  ngOnInit() {
    // Get all pending recipes
    this.getAllPendingRecipes();
  }

  getAllPendingRecipes(){
    this.pendingRecipesService.getPendingRecipes().subscribe((res) => {
      this.pendingRecipes = res;
    });
  }

  // post to recipe
  posttorecipe(id:any){
    this.pendingRecipesService.getOnePendingRecipe(id).subscribe((res:any)=>{
      const ingredientsWithQuantities = res.ingredients.map((ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
        quantity: ingredient.pivot.quantity, 
        measurement_unit: ingredient.pivot.measurement_unit
    }));
      this.newrecipe={
        "name":res.name,
        "description":res.description,
        "category_id":res.category_id,
        "directions":res.directions,
        "ingredients":ingredientsWithQuantities,
        "image":res.image,
        "servings":res.servings,
        "time":res.time,
        "subcategory_id":res.subcategory_id,
        "category":res.category.name,
        "subcategory":res.subcategory.name,
        "user_id":res.user_id
        }
      this.recipe.postRecipe(this.newrecipe).subscribe((res)=>{
        
        this.deletePendingRecipe(id);
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

  // edit
  editPendingRecipe(id:any){
    this.router.navigate(['/admin-edit-pendingRecipes',id]);
  }
}
