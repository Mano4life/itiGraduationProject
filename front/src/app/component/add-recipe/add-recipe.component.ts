import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipesService } from '../../core/services/recipes.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgFor],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
  recipeForm!: FormGroup;
  recipe!: any;
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      directions: new FormControl('', [Validators.required, Validators.minLength(2)]),
      image: new FormControl('', [Validators.required, Validators.minLength(2)]),
      category: new FormControl('', [Validators.required, Validators.minLength(2)]),
      subcategory: new FormControl('', [Validators.required, Validators.minLength(2)]),
      ingredients: new FormArray([]),
    })
  }

  addIngredient() {
    const ingredientForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      measurement_unit: new FormControl('', [Validators.required]),
    });
    (this.recipeForm.get('ingredients') as FormArray).push(ingredientForm);
  }

  onSubmission() {
    if (this.recipeForm.valid) {
      const recipeData = {
        name: this.recipeForm.value.name,
        description: this.recipeForm.value.description,
        directions: this.recipeForm.value.directions,
        image: this.recipeForm.value.image,
        category: this.recipeForm.value.category,
        subcategory: this.recipeForm.value.subcategory,
        ingredients: this.recipeForm.value.ingredients.map((ingredient: { name: any; quantity: any; measurement_unit: any; }) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
          measurement_unit: ingredient.measurement_unit,
        }))
      };
  
      this.recipesService.postRecipe(recipeData).subscribe({
        next: (res) => {
          console.log("Recipe added successfully:", res);
        },
        error: (err) => {
          console.error('Error creating recipe', err);
        }
      });
    }
  }
  

  // onSubmission() {
  //   if (this.recipeForm.valid) {
  //     const recipeData = this.recipeForm.value;
  
  //     this.recipesService.postRecipe(recipeData).subscribe({
  //       next: (res) => {
  //         console.log("Recipe added successfully:", res);
  //       },
  //       error: (err) => {
  //         console.error("Error creating recipe", err);
  //       },
  //       complete: () => {
  //         console.log("Recipe creation request complete.");
  //       }
  //     });
  //   } else {
  //     console.error("Form is invalid!");
  //   }
  // }

  
}
