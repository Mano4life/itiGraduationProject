import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from '../core/services/recipes.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  onSubmission(){
    this.recipesService.postRecipe().subscribe((res)=>{
      console.log("book added successfully:", res);
    });
  }
}
