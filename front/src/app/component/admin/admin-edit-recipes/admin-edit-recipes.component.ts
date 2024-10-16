import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-recipes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './admin-edit-recipes.component.html',
  styleUrl: './admin-edit-recipes.component.css',
})
export class AdminEditRecipesComponent {
  editForm!: FormGroup;
  editRecipeId!: number;
  editSingleRecipe!: any;
  imageLink: any;

  constructor(
    private routerActive: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
        Validators.pattern(/^[A-Za-z0-9\s,.'-]+$/),
      ]),
      servings: new FormControl('', [Validators.required, Validators.min(1)]),
      time: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(1440),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      directions: new FormControl('', [
        Validators.required,
        Validators.maxLength(2000),
      ]),
      image: new FormControl(null, [Validators.required]),
      category: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/),
      ]),
      subcategory: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/),
      ]),
      ingredients: new FormArray([
        new FormGroup({
          name: new FormControl('', [
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern(/^[A-Za-z\s]+$/),
          ]),
          quantity: new FormControl('', [
            Validators.required,
            Validators.min(1),
          ]),
          measurement_unit: new FormControl('', [Validators.required]),
        }),
      ]),
    });
    this.editRecipeId = this.routerActive.snapshot.params['id'];

    if (this.editRecipeId) {
      this.recipeService
        .getSingleRecipe(this.editRecipeId)
        .subscribe((data) => {
          this.editSingleRecipe = data;
          this.imageLink = data.image;
          console.log('recipe output', this.editSingleRecipe);
          console.log('image link is: ', this.imageLink);
          // Patch the form with the basic recipe data
          this.editForm.patchValue({
            id: data.id,
            name: data.name,
            servings: data.servings,
            time: data.time,
            description: data.description,
            directions: data.directions,
            category: data.category.name,
            subcategory: data.subcategory.name,
          });
          console.log(this.editForm);

          // Clear existing ingredients and add new ones
          const ingredientsFormArray = this.editForm.get(
            'ingredients'
          ) as FormArray;
          ingredientsFormArray.clear(); // Clear the existing FormArray

          data.ingredients.forEach(
            (ingredient: {
              name: string;
              quantity: string;
              measurement_unit: string;
            }) => {
              const ingredientGroup = new FormGroup({
                name: new FormControl(ingredient.name, [
                  Validators.required,
                  Validators.maxLength(100),
                  Validators.pattern(/^[A-Za-z\s]+$/),
                ]),
                quantity: new FormControl(ingredient.quantity, [
                  Validators.required,
                  Validators.min(1),
                ]),
                measurement_unit: new FormControl(
                  ingredient.measurement_unit,
                  Validators.required
                ),
              });
              ingredientsFormArray.push(ingredientGroup); // Add to FormArray
            }
          );
        });
    }
  }

  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  editRecipe() {
    if (!this.editForm.valid) {
      console.log('Form is invalid');
      for (const control in this.editForm.controls) {
        if (this.editForm.controls[control].invalid) {
          console.log(
            `${control} is invalid:`,
            this.editForm.controls[control].errors
          );
        }
      }
    }

    if (this.editForm.valid) {
      const formData = new FormData();

      // Append each field from recipeData to FormData
      formData.append('name', this.editForm.value.name);
      formData.append('time', this.editForm.value.time);
      formData.append('servings', this.editForm.value.servings);
      formData.append('description', this.editForm.value.description);
      formData.append('directions', this.editForm.value.directions);

      // Check if selectedFile is not null before appending
      if (this.selectedFile) {
        formData.append('image', this.selectedFile); // Ensure selectedFile is the File object
      } else {
        formData.append('image', this.imageLink);
      }

      formData.append('category', this.editForm.value.category);
      formData.append('subcategory', this.editForm.value.subcategory);
      formData.append('user_id', this.editSingleRecipe.user.id);

      // Append each ingredient to FormData
      this.editForm.value.ingredients.forEach(
        (
          ingredient: { name: any; quantity: any; measurement_unit: any },
          index: number
        ) => {
          formData.append(`ingredients[${index}][name]`, ingredient.name);
          formData.append(
            `ingredients[${index}][quantity]`,
            ingredient.quantity
          );
          formData.append(
            `ingredients[${index}][measurement_unit]`,
            ingredient.measurement_unit
          );
        }
      );
      console.log('data to be sent', formData);

      this.recipeService.updateRecipe(this.editRecipeId, formData).subscribe({
        next: (res) => {
          console.log('Recipe added successfully:', res);
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Error creating recipe', err);
        },
      });
    }
  }

  onImageUpload(img: any) {}
}
