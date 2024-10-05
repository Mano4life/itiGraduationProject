import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
declare var bootstrap: any;

@Component({
  selector: 'app-admin-add-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './admin-add-recipe.component.html',
  styleUrl: './admin-add-recipe.component.css'
})
export class AdminAddRecipeComponent {
  recipeForm!: FormGroup;
  recipe!: any;
  userId!: any;
  constructor(
    private recipeService: RecipesService,
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

    const modalElement = document.getElementById('recipesuccess');
    if (modalElement) {
      this.renderer.listen(modalElement, 'hidden.bs.modal', () => {
        this.router.navigate(['/admin']);
      });
    }
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
      const recipeData = {
        name: this.recipeForm.value.name,
        time:this.recipeForm.value.time,
        servings:this.recipeForm.value.Serving,
        description: this.recipeForm.value.description,
        directions: this.recipeForm.value.directions,
        image: this.recipeForm.value.image,
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

      this.recipeService.postRecipe(recipeData).subscribe({
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
