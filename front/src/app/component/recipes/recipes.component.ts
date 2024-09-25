import { Component } from '@angular/core';
import { TestService } from '../../test.service';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../../core/services/recipes.service';
import { CategoriesService } from '../../core/services/categories.service';
import { SubcategoriesService } from '../../core/services/subcategories.service';
import { IngredientsService } from '../../core/services/ingredients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  recipeList:any[] = [];
  sub_categoryList: any[] = [];
  ingredentsList :any[] = [];

  constructor(private recipes:RecipesService,private subcategories:SubcategoriesService,private ingredent:IngredientsService,private router:Router) { }
  ngOnInit(): void {
    this.getreciepes();
    this.getsubcategories();
    this.getingredients();
  }
  getreciepes(){
    this.recipes.getRecipes().subscribe({
      next:(Response:any)=>{
        this.recipeList = Response;
        console.log(this.recipeList);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }
  getsubcategories(){
    this.subcategories.getSubCategories().subscribe({
      next:(Response:any)=>{
        // Assuming Response.data is an array of subcategories
        this.sub_categoryList = Response.data.map((sub: any, index: number) => ({
          id: sub.id, // Adjust this based on your actual response structure
          name: sub.name,
          selected: false // Initialize selected as false
        }));
        console.log(this.sub_categoryList);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }
  getingredients(){
    this.ingredent.getIngredients().subscribe({
      next:(Response:any)=>{
        // Assuming Response.data is an array of subcategories
        this.ingredentsList = Response.map((sub: any, index: number) => ({
          id: sub.id, // Adjust this based on your actual response structure
          name: sub.name,
          selected: false // Initialize selected as false
        }));
        console.log(this.ingredentsList);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }
  time = [
    { id: 1, name: '10 t0 20 mins', selected: false },
    { id: 2, name: '20 to 40 mins', selected: false },
    { id: 3, name: 'more than 40 mins', selected: false },
  ];

  dropdownOpen = false;
  dropdown2Open = false;
  dropdown3Open = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.dropdown2Open = false;
    this.dropdown3Open = false;
  }
 toggleDropdown2() {
  this.dropdownOpen = false;
  this.dropdown2Open = !this.dropdown2Open;
  this.dropdown3Open = false;
  }
  toggleDropdown3() {
    this.dropdownOpen = false;
    this.dropdown2Open =false;
    this.dropdown3Open = !this.dropdown3Open;
  }
  toggleOption(option: any) {
    this.sub_categoryList.forEach(opt => {
      opt.selected = opt === option ? !opt.selected : false; 
    });
  }

  getSelectedSub_category() {
    return this.sub_categoryList.filter(option => option.selected).map(opt => opt.name);
  }
  toggleOption2(option: any) {
    option.selected = !option.selected;
  }

  getSelectedIngridents() {
    return this.ingredentsList.filter(option => option.selected);
  }
  toggleOption3(option: any) {
    this.time.forEach(opt => {
      opt.selected = opt === option ? !opt.selected : false; 
    });
  }

  getSelectedIngredients() {
    return this.ingredentsList.filter(option => option.selected).map(opt => opt.name);
  }

  getSelectedtime() {
    return this.time.filter(option => option.selected).map(opt => opt.name);
  }
  
 
  selectedCategories: string[] = []; 

  toggleCategory(category: string) {
      
      this.selectedCategories = [];
  
      
      this.selectedCategories.push(category);
  }
  
  isCategorySelected(category: string): boolean {
      return this.selectedCategories.includes(category);
  }
  
  getFilteredRecipes() {
    const selectedSubCategories = this.getSelectedSub_category();
    const selectedIngredients = this.getSelectedIngredients();
    const selectedTimes = this.getSelectedtime();
  
    return this.recipeList.filter(recipe => {
      const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(recipe.category.name);
      const matchesSubCategory = selectedSubCategories.length === 0 || selectedSubCategories.includes(recipe.sub_category.name);
      
      // Use 'any' type for the ingredient parameter
      const matchesIngredients = selectedIngredients.length === 0 || recipe.ingredients.some((ingredient: any) => selectedIngredients.includes(ingredient.name));
      
      const matchesTime = selectedTimes.length === 0 || this.timeMatches(recipe.time, selectedTimes);
  
      return matchesCategory && matchesSubCategory && matchesIngredients && matchesTime;
    });
  }
  timeMatches(recipeTime: number, selectedTimes: string[]): boolean {
    return selectedTimes.some(selected => {
      if (selected === '10 to 20 mins') return recipeTime >= 10 && recipeTime <= 20;
      if (selected === '20 to 40 mins') return recipeTime > 20 && recipeTime <= 40;
      if (selected === 'more than 40 mins') return recipeTime > 40;
      return false;
    });
  }
  SingleRecipePage(recipeId:number){
    this.router.navigate(['/recipe', recipeId]);
  }

}
