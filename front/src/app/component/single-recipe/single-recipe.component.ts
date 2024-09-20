import { Component } from '@angular/core';
import { RecipesService } from '../../core/services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css'
})
export class SingleRecipeComponent {
  recipe: any;

  constructor(private recipesService: RecipesService, private router: Router){
    this.recipesService.getSingleRecipe().subscribe((res)=>{
      console.log(res);
    })
  }
}
