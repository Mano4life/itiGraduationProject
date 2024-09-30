import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-recipes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './admin-edit-recipes.component.html',
  styleUrl: './admin-edit-recipes.component.css'
})
export class AdminEditRecipesComponent {
  editForm!:FormGroup;
  editRecipeId!:number;
  editSingleRecipe!: any;

  constructor(private routerActive:ActivatedRoute, private recipeService: RecipesService) {

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
      ingredients: new FormArray([
        new FormGroup({
          name: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.required),
          measurement_unit: new FormControl('', Validators.required),
        }),
      ]),
    });
    this.editRecipeId = this.routerActive.snapshot.params['id']; 

    if(this.editRecipeId){
      this.recipeService.getSingleRecipe(this.editRecipeId).subscribe((data) => {
          this.editSingleRecipe = data;
          console.log(this.editSingleRecipe);
          
          // Patch the form with the returned recipe data
        this.editForm.patchValue({
          id: data.id,
          name: data.name,
          Servings: data.servings,
          time: data.time,
          Description: data.description,
          Direction: data.directions,
          Username:data.user.name,
          image: data.image 
        });
      });
    }
    
  }
  get ingredients() {
    return this.editForm.get('ingredients') as FormArray;
  }
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

  editRecipe(){
    
  }

  onImageUpload(img:any){

  }
}
