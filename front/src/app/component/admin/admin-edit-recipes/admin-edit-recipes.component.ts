import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-recipes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './admin-edit-recipes.component.html',
  styleUrl: './admin-edit-recipes.component.css'
})
export class AdminEditRecipesComponent {
  editForm!:FormGroup;
  editRecipeId!:number;
  editSingleRecipe!: any;

  constructor(private routerActive:ActivatedRoute, private recipeService: RecipesService,private router:Router) {

  }

  ngOnInit() {
    this.editForm = new FormGroup({
      id:new FormControl('',[Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      Username:new FormControl('',[Validators.required]),
      Servings: new FormControl('', [Validators.required, Validators.minLength(1)]),
      time: new FormControl('', [Validators.required, Validators.minLength(1)]),
      Description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      Direction: new FormControl('', [
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
      ingredients: new FormArray([])
    });
    this.editRecipeId = this.routerActive.snapshot.params['id']; 

    if (this.editRecipeId) {
      this.recipeService.getSingleRecipe(this.editRecipeId).subscribe((data) => {
        this.editSingleRecipe = data;
        console.log("recipe output",this.editSingleRecipe)
        // Patch the form with the basic recipe data
        this.editForm.patchValue({
          id: data.id,
          name: data.name,
          Servings: data.servings,
          time: data.time,
          Description: data.description,
          Direction: data.directions,
          Username: data.user.name,
          image: data.image,
          category:data.category.name,
          subcategory:data.subcategory.name,
        });
        console.log(this.editForm)
    
        // Clear existing ingredients and add new ones
        const ingredientsFormArray = this.editForm.get('ingredients') as FormArray;
        ingredientsFormArray.clear(); // Clear the existing FormArray
    
        data.ingredients.forEach((ingredient: { name: string; quantity: string; measurement_unit: string }) => {
          const ingredientGroup = new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            quantity: new FormControl(ingredient.quantity, Validators.required),
            measurement_unit: new FormControl(ingredient.measurement_unit, Validators.required),
          });
          ingredientsFormArray.push(ingredientGroup); // Add to FormArray
        });
      });
    }}


  editRecipe(){
    if (!this.editForm.valid) {
      console.log('Form is invalid');
      for (const control in this.editForm.controls) {
        if (this.editForm.controls[control].invalid) {
          console.log(`${control} is invalid:`, this.editForm.controls[control].errors);
        }
      }
    }
    
    if (this.editForm.valid) {
      const recipeData = {
        name: this.editForm.value.name,
        time:this.editForm.value.time,
        servings:this.editForm.value.Servings,
        description: this.editForm.value.Description,
        directions: this.editForm.value.Direction,
        image: this.editForm.value.image,
        category: this.editForm.value.category,
        subcategory: this.editForm.value.subcategory,
        user_id: this.editSingleRecipe.user.id,
        ingredients: this.editForm.value.ingredients.map(
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
      console.log("data to be sent",recipeData);

      this.recipeService.updateRecipe(this.editRecipeId,recipeData).subscribe({
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

  onImageUpload(img:any){

  }
}