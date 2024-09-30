import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../../core/services/recipes/recipes.service';

@Component({
  selector: 'app-admin-edit-recipes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './admin-edit-recipes.component.html',
  styleUrl: './admin-edit-recipes.component.css'
})
export class AdminEditRecipesComponent {
  editForm!:FormGroup;
  editRecipeId!:number;
  editSingleRecipe!: any;

  constructor(private routerActive:ActivatedRoute, private recipeService: RecipesService) {
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
    
  }

  onImageUpload(img:any){

  }
}
