import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PendingRecipesService } from '../../../core/services/pendinRecipes/pending-recipes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-pending-recipes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule, RouterLink],
  templateUrl: './admin-edit-pending-recipes.component.html',
  styleUrl: './admin-edit-pending-recipes.component.css'
})
export class AdminEditPendingRecipesComponent {
  editForm!:FormGroup;
  pendingRecipeId!:number;
  editPendingRecipe!: any;

  constructor(private routerActive:ActivatedRoute, private pendingRecipeService: PendingRecipesService,private router:Router) {

  }

  imageUrl: any;
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
      image: new FormControl(null),
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

    this.pendingRecipeId = this.routerActive.snapshot.params['id']; 

    if (this.pendingRecipeId) {
      this.pendingRecipeService.getOnePendingRecipe(this.pendingRecipeId).subscribe((data:any) => {
        this.editPendingRecipe = data;
        console.log("output pending",this.editPendingRecipe)

        this.imageUrl = this.editPendingRecipe.image;
        
        // Patch the form with the basic recipe data
        this.editForm.patchValue({
          id: data.id,
          name: data.name,
          Servings: data.servings,
          time: data.time,
          Description: data.description,
          Direction: data.directions,
          Username: data.user.name,
          category:data.category.name,
          subcategory:data.subcategory.name,
        });
        console.log(this.editForm)
    
        // Clear existing ingredients and add new ones
        const ingredientsFormArray = this.editForm.get('ingredients') as FormArray;
        ingredientsFormArray.clear(); // Clear the existing FormArray
    
        data.ingredients.forEach((ingredient: { name: string; pivot:{quantity: string; measurement_unit: string }}) => {
          const ingredientGroup = new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            quantity: new FormControl(ingredient.pivot.quantity, Validators.required),
            measurement_unit: new FormControl(ingredient.pivot.measurement_unit, Validators.required),
          });
          ingredientsFormArray.push(ingredientGroup); // Add to FormArray
        });
      });
    }
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

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
      const formData = new FormData();

      // Append each field from recipeData to FormData
      formData.append('name', this.editForm.value.name);
      formData.append('time', this.editForm.value.time);
      formData.append('servings', this.editForm.value.Servings);
      formData.append('description', this.editForm.value.Description);
      formData.append('directions', this.editForm.value.Direction);
      
      // Check if selectedFile is not null before appending
      if (this.selectedFile) {
        formData.append('image', this.selectedFile); // Ensure selectedFile is the File object
      } else {
        formData.append('image', this.imageUrl);
      }
      
      formData.append('status', 'pending');
      formData.append('category', this.editForm.value.category);
      formData.append('subcategory', this.editForm.value.subcategory);
      formData.append('user_id', this.editPendingRecipe.user.id);
      
      // Append each ingredient to FormData
      this.editForm.value.ingredients.forEach((ingredient: { name: any; quantity: any; measurement_unit: any; }, index: number) => {
        formData.append(`ingredients[${index}][name]`, ingredient.name);
        formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
        formData.append(`ingredients[${index}][measurement_unit]`, ingredient.measurement_unit);
      });

      console.log(formData);
      
      this.pendingRecipeService.updatePendingRecipe(this.pendingRecipeId,formData).subscribe({
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
}
