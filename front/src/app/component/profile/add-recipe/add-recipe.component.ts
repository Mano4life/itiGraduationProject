import { Component, Renderer2 } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PendingRecipesService } from '../../../core/services/pendinRecipes/pending-recipes.service';
declare var bootstrap: any;
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
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router
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
      image: new FormControl(null, [ Validators.required ]),
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

    const modalElement = document.getElementById('recipesuccess');
    if (modalElement) {
      this.renderer.listen(modalElement, 'hidden.bs.modal', () => {
        this.router.navigate(['/profile']);
      });
    }
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
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

  onSubmission(modal:string) {
    if (this.recipeForm.valid) {
      const formData = new FormData();

      // Append each field from recipeData to FormData
      formData.append('name', this.recipeForm.value.name);
      formData.append('time', this.recipeForm.value.time);
      formData.append('servings', this.recipeForm.value.Serving);
      formData.append('description', this.recipeForm.value.description);
      formData.append('directions', this.recipeForm.value.directions);
      
      // Check if selectedFile is not null before appending
      if (this.selectedFile) {
        formData.append('image', this.selectedFile); // Ensure selectedFile is the File object
      } else {
        console.error('No file selected');
      }
      
      formData.append('status', 'pending');
      formData.append('category', this.recipeForm.value.category);
      formData.append('subcategory', this.recipeForm.value.subcategory);
      formData.append('user_id', this.userId);
      
      // Append each ingredient to FormData
      this.recipeForm.value.ingredients.forEach((ingredient: { name: any; quantity: any; measurement_unit: any; }, index: number) => {
        formData.append(`ingredients[${index}][name]`, ingredient.name);
        formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
        formData.append(`ingredients[${index}][measurement_unit]`, ingredient.measurement_unit);
      });

      this.pendingService.postPendingRecipes(formData).subscribe({
        next: (res) => {
          console.log('Recipe added successfully:', res);
          const nextModalEl = document.getElementById(modal);
          const nextModalInstance = new bootstrap.Modal(nextModalEl);
          nextModalInstance.show();
        },
        error: (err) => {
          console.error('Error creating recipe', err);
        },
      });
    }
  }

}
