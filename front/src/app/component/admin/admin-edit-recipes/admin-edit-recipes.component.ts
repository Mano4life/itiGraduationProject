import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { RecipesService } from '../../../core/services/recipes/recipes.service';

@Component({
  selector: 'app-admin-edit-recipes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLinkWithHref],
  templateUrl: './admin-edit-recipes.component.html',
  styleUrl: './admin-edit-recipes.component.css'
})
export class AdminEditRecipesComponent {
  editForm!:FormGroup;
  editRecipeId!:number;
  editSingleRecipe!: any;

  constructor(private routerActive:ActivatedRoute, private recipeService: RecipesService,private router:Router) {
    this.editForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }, Validators.required),
      name: new FormControl('', Validators.required),
      user: new FormGroup({
        name: new FormControl('', Validators.required),
      }),
      image: new FormControl('') // To hold the image URL
    });
  }

  ngOnInit() {
    this.editRecipeId = this.routerActive.snapshot.params['id']; 

    if(this.editRecipeId){
      this.recipeService.getSingleRecipe(this.editRecipeId).subscribe((data) => {
          this.editSingleRecipe = data;
          console.log(this.editSingleRecipe);
          
          // Patch the form with the returned recipe data
        this.editForm.patchValue({
          id: data.id,
          name: data.name,
          user: { name: data.user.name },
          image: data.image // Assuming 'image' is a property in your data
        });
      });
    }
    
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
