import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PendingRecipesService } from '../../core/services/pendinRecipes/pending-recipes.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgFor, NgIf],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  recipeForm!: FormGroup;
  recipe!: any;
  userId!: any;
  constructor(
    private pendingService: PendingRecipesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });

    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      Serving: new FormControl('', [Validators.required, Validators.minLength(1)]),
      time: new FormControl('', [Validators.required, Validators.minLength(1)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      directions: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      subcategory: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      ingredients: new FormArray([
        new FormGroup({
          name: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.required),
          measurement_unit: new FormControl('', Validators.required),
        }),
      ]),
    });
  }

  // Get the FormArray for ingredients
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  // Add a new ingredient form group to the FormArray
  addIngredient() {
    const ingredientGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      measurement_unit: new FormControl('', Validators.required),
    });

    this.ingredients.push(ingredientGroup);
  }

  // Remove an ingredient form group from the FormArray
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmission() {
    if (this.recipeForm.valid) {
      const recipeData = {
        name: this.recipeForm.value.name,
        time:this.recipeForm.value.time,
        servings:this.recipeForm.value.Serving,
        description: this.recipeForm.value.description,
        directions: this.recipeForm.value.directions,
        image: this.recipeForm.value.image,
        status: 'pending',
        category: this.recipeForm.value.category,
        subcategory: this.recipeForm.value.subcategory,
        user_id: this.userId,
        ingredients: this.recipeForm.value.ingredients.map(
          (ingredient: {
            name: any;
            quantity: any;
            measurement_unit: any;
          }) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            measurement_unit: ingredient.measurement_unit,
          })
        ),
      };

      this.pendingService.postPendingRecipes(recipeData).subscribe({
        next: (res) => {
          console.log('Recipe added successfully:', res);
        },
        error: (err) => {
          console.error('Error creating recipe', err);
        },
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
